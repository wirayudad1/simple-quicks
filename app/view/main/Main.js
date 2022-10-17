/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('SuperQuicks.view.main.Main', {
    extend: 'Ext.container.Container',
    requires: [
        'SuperQuicks.view.main.MainController',
        'SuperQuicks.view.main.MainModel',
        'SuperQuicks.view.main.windowMessage.listMessage',
        'SuperQuicks.view.main.task.list'
    ],

    xtype: 'app-main',
    cls:'colorHeaderHome',
    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'border'
    },

    items: [{
        region: 'center',
        xtype: 'panel',
        title:'Simpul Technologies',
        items:[{
            xtype:'container',
            style:{
                backgroundColor:'#0F8C69',
                textAlign:'center',
                fontSize:'50px',
                color:'#FFFFFF',
                paddingTop:'45vh',
                fontWeight:'bold'
            },
            height:'90vh',
            html: '<span style="margin-top:50vh">Simple Quicks</span>'
        }, {
            xtype:'toolbar',
            style:{
                backgroundColor:'#0F8C69',
            },
            height:'10vh',
            items:[
                '->',
                {
                    xtype:'button',
                    text:'Message',
                    handler(button){
                        let createView = Ext.create('SuperQuicks.view.main.windowMessage.listMessage', {
                            width:500,
                            height:500,
                            closable:true,
                        });
                        createView.show()
                    }
                },
                {
                    xtype:'button',
                    text:'Task',
                    enableToggle: true,
                    listeners:{
                        toggle(button, pressed, e) {
                            // console.log('button')
                           
                            if(pressed){
                                let createView = Ext.create('SuperQuicks.view.main.task.list', {
                                    width:500,
                                    height:500,
                                    itemId:'taskdata',
                                    closable:true,
                                    listeners:{
                                        beforeclose(){
                                            button.pressed=false
                                        }
                                    }
                                });
                                console.log('tekan')
                                createView.show()
                            }
                            else{
                                console.log('lepas')
                                console.log(Ext.ComponentQuery.query('#taskdata')[0])
                                Ext.ComponentQuery.query('#taskdata')[0].destroy()
                            }
                        },
                    },
                    // handler(button){
                    //     let createView = Ext.create('SuperQuicks.view.main.task.list', {
                    //         width:500,
                    //         height:500,
                    //         closable:true,
                    //     });
                    //     createView.show()
                    // }
                }
            ]
        }]
    }]
});
