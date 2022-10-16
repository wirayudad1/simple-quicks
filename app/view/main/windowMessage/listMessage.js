
Ext.define('SuperQuicks.view.main.windowMessage.listMessage', {
    extend          : 'Ext.window.Window',
    initComponent () {

        Ext.apply(this, {
            layout: 'fit',
            iconCls:'message',
            title:'Messages',
            items: [
                this.createList()
            ],
            // bbar:[
            //     '->',
            //
            // ]
            listeners:{
                afterrender(){
                    this.dataMessage()
                }
            }
        })

        this.callParent(arguments);
    },
    createList(){
        let me=this;
        me.panelMessage=Ext.create('Ext.panel.Panel',{
            width: 500,
            height:450,
            layout:{
                type:'vbox'
            },
            items:[
                {
                    xtype:'container',
                    width:'100%',
                    layout:{
                        type:'hbox'
                    },
                    items:[
                        {
                            xtype:'textfield',
                            width:'85%',
                            margin:8,
                            emptyText: 'Search',   
                        },
                        {
                            xtype:'button',
                            text:'Search',
                            margin:'8 8 8 4',
        
                        },
                    ]
                },                
            ]
        })
        return me.panelMessage
    },
    dataMessage(){
        let me=this
        this.setLoading(true)
        console.log('halo')
        let data=[
            {
                title   :'Naturalization',
                date    :'1 Januari 2021 19:20',
                name    :'Rakhmat',
                message :'please check out'
            },
            {
                title   :'Check Task',
                date    :'4 Januari 2021 20:20',
                name    :'Rudi Akhsan',
                message :'Your Task has been added'
            },
            {
                title   :'Check Task',
                date    :'4 Januari 2021 20:20',
                name    :'Rudi Akhsan',
                message :'Your Task has been added'
            },
            {
                title   :'Check Task',
                date    :'4 Januari 2021 20:20',
                name    :'Rudi Akhsan',
                message :'Your Task has been added'
            },
            {
                title   :'Check Task',
                date    :'4 Januari 2021 20:20',
                name    :'Rudi Akhsan',
                message :'Your Task has been added'
            },
            {
                title   :'Check Task',
                date    :'4 Januari 2021 20:20',
                name    :'Rudi Akhsan',
                message :'Your Task has been added'
            }
        ]
        let container=Ext.create('Ext.container.Container',{
            height:400,
            width:'100%',
            autoScroll:true,
        })
        data.map((value)=>{
            let list=me.createPanel(value.title,value.date,value.name,value.message)
            container.add(list)
        })
        this.setLoading(false)
        me.panelMessage.add(container)
    },
    createPanel(title,date,name,message) {
        let me = this;
        me.containerMessage=Ext.create('Ext.container.Container',{
            width:'96%',
            region:'center',
            margin:'8 8 8 8',
            style:{
                borderStyle: 'solid',
                borderColor: '#FFFFFF',
                borderRadius: '4px',
                cursor:'pointer',
                boxShadow: 'rgb(0 0 0 / 25%) 0px 0px 4px',
            },
            items:[
               {
                    xtype:'container',
                    layout:{
                        type:'hbox'
                    },
                    items:[
                        {
                            xtype:'label',
                            margin:'12 8 8 8',
                            html: '<img class="contact" width="35" height="35" style="border-style:none;border:0px;border-color:#FFFFFF">'
                        },
                        {
                            xtype:'container',
                            padding:4,
                            layout:{
                                type:'vbox'
                            },
                            items:[
                                {
                                    xtype:'label',
                                    html:`<b style="color:#3098F2;font-size:15px">${title}</b><b style="margin-left: 8px;color:#A7A7A7">${date}</b>`,
                                },
                                {
                                    xtype:'label',
                                    html:`<b>${name}:</b>`
                                },
                                {
                                    xtype:'label',
                                    html:`${message}`
                                },

                            ]
                        }
                    ]
               }
            ],
            listeners:{
                afterrender: function(el, layout, eOpts){
                    console.log(el);
                    $( "#" + el.id ).click(function() {
                        console.log('ok')
                    });
                }
            }
        })
        return me.containerMessage
        // return Ext.create('Ext.container.Container', {
        //     height : 65,
        //     html   : `
        //         <div id="x12" class="inm-joborder-box-info inm-joborder-box-wo" style="font-size: 8px;font-weight: normal;text-align: left;display: block;margin: 5px 5px 0px 5px;padding: 10px;">
        //             <table>
        //                 <tr>
        //                     <td width="24"><div class="inm-fiola-info-icon" style="float:left;width: 16px; height: 16px;display: inline-block;">&nbsp;</div></td>
        //                     <td>Untuk memasukkan Site ID yang lebih dari 1, dapat menggunakan tanda "," sebagai pemisah dan tanpa spasi. Contoh Inputan : MIT001,MIT002,MIT003,dst.</td>
        //                 </tr>
        //             </table>
        //         </div>`
        // });
    },
  
});