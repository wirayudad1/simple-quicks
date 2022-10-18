
Ext.define('SuperQuicks.view.main.task.list', {
    extend          : 'Ext.window.Window',
    total_task:null,
    total_urgent:0,
    initComponent () {
        let me=this
        Ext.apply(this, {
            layout: 'fit',
            iconCls:'task',
            title:'Task',
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
                    Ext.getBody().on('click', function(e, t, o) {

                        var action = t.getAttribute('data-id');
                        let data=action.split('-')
                        console.log(action)
                        Ext.getCmp(`panel_task-${data[1]}`).hide()
            
                    }, me, {delegate: `div.delete_task`});
                }
            }
        })

        this.callParent(arguments);
    },
    createList(){
        let me=this;
        let task  = Ext.create('Ext.data.Store', {
            autoLoad : true,
            fields: ['id','name'],
            data     : [
                { id: "1", name: 'My Task' },
                { id: "2", name: 'Other' },
            ]
        });
        me.panelTask=Ext.create('Ext.panel.Panel',{
            width: 500,
            height:450,
            layout:{
                type:'vbox'
            },
            items:[
                {
                    xtype:'toolbar',
                    width:'100%',
                    layout:{
                        type:'hbox'
                    },
                    items:[
                        {
                            xtype:'combobox',
                            width:'30%',
                            valueField:'id',
                            store:task,
                            displayField:'name',
                            margin:8,
                            listeners:{
                                render(combo){
                                    combo.setValue('1')
                                }
                            }
                        },
                        '->',
                        {
                            xtype:'button',
                            text:`<span style="color:#FFFFFF;">New Task</span>`,
                            style:{
                                backgroundColor: '#2F80ED',
                                'background-image': 'none',
                                borderColor:'#2F80ED',
                            },
                            margin:8,
                            handler(obj){
                                me.total_task++
                                let task_panel=Ext.getCmp('container_list_task')
                                let value={
                                    id_text:`task_${me.total_task}`,
                                    title:'',
                                    date:null,
                                    message:''
                                }
                                task_panel.add(me.createPanel(value,''))
                                task_panel.scrollBy(0, 999999, true);

                            }
        
                        },
                    ]
                },                
            ]
        })
        return me.panelTask
    },
    dataMessage(){
        let me=this
        this.setLoading(true)
        console.log('halo')
        let data=[
            {
                id_text :'task_1',
                title   :'Product Application',
                date    :'08/11/2022',
                message :'Finish Product Management'
            },
            {
                id_text :'task_2',
                title   :'Feature Development',
                date    :'30/10/2022',
                message :'Meeting with user, for decide next step features'
            },
            {
                id_text :'task_3',
                title   :'Message Feature',
                date    :'20/10/2022',
                message :'Features Message to asset peoples'
            },
            {
                id_text :'task_4',
                title   :'Maintenance Asset',
                date    :'15/10/2022',
                message :'Features maintenance company asset '
            },
            {
                id_text :'task_5',
                title   :'Command Center',
                date    :'12/10/2022',
                message :'Insight based on Alarm '
            },
            {
                id_text :'task_6',
                title   :'Corrective Maintenance',
                date    :'10/10/2022',
                message :'Feature Draft List for Create Ticket'
            }
        ]
        me.total_task=data.length
        container=Ext.create('Ext.container.Container',{
            height:400,
            id:'container_list_task',
            width:'100%',
            autoScroll:true,
        })
        data.map((value)=>{
            let list=me.createPanel(value)
            container.add(list)
        })
        this.setLoading(false)
        me.panelTask.add(container)
    },
    createPanel(value, button='disabled') {
        let me = this;
        // if(value.date==null)
        // {
        //     value.date=''
        // }
        me.containerMessage=Ext.create('Ext.panel.Panel',{
            width:'96%',
            id:`panel_task-${value.id_text}`,
            region:'center',
            title:`<span><input type="checkbox"></span>
           <span><input id=title-${value.id_text} type="text" ${button} style="width:150px"></span>
           <div class=delete_task data-id=button-${value.id_text} style="cursor:pointer;float:right;display:inline-block;min-width: 50px; color:#ffffff;font-weight: bold;border-radius: 4px;border-color: #FF0000;background-color:#FF0000;text-align: center;padding: 1px;font-size:10px;margin-top:2px">Delete</div>
           <div  id=date-${value.id_text} style="display:inline-block;color:#949A9E;font-size:12px;right:0;margin-top:2px;margin-right:4px;float:right">${(value.date==null)?'':value.date}</div>
            `,
            cls:'colorPanel',
            collapsible: true,  // To allow collapse
            margin:'8 8 8 8',
            style:{
                borderStyle: 'solid',
                borderColor: '#FFFFFF',
                borderRadius: '4px',
                boxShadow: 'rgb(0 0 0 / 25%) 0px 0px 3px',
            },
            items:[
               {
                    xtype:'container',
                    layout:{
                        type:'hbox'
                    },
                    items:[
                        {
                            xtype:'container',
                            layout:{
                                type:'vbox'
                            },
                            items:[
                                {
                                    xtype:'button',
                                    margin:'4 0 0 8',
                                    iconCls:'time',
                                    style:{
                                        backgroundColor: '#FFFFFF',
                                        'background-image': 'none',
                                        borderColor:'#FFFFFF',
                                        cursor:'auto',
                                    },
                                    handler(){
                                        return false
                                    }
                                   // html: '<img class="time" width="25" height="25" style="border-style:none;border:0px;border-color:#FFFFFF">'
                                },
                                {
                                    xtype:'button',
                                    margin:'4 0 0 8',
                                    iconCls:'editable',
                                    style:{
                                        
                                        backgroundColor: '#FFFFFF',
                                        'background-image': 'none',
                                        borderColor:'#FFFFFF',
                                    },
                                    handler(){
                                        Ext.getCmp(value.id_text).setDisabled(false)
                                    }
                                   // html: '<img class="time" width="25" height="25" style="border-style:none;border:0px;border-color:#FFFFFF">'
                                },
                                {
                                    xtype:'button',
                                    margin:'49 0 0 8',
                                    arrowVisible:false,
                                    iconCls:'copy',
                                    style:{
                                        backgroundColor: '#FFFFFF',
                                        'background-image': 'none',
                                        borderColor:'#FFFFFF',
                                        cursor:'auto',
                                    },
                                    menu: {
                                        items: [
                                            {
                                                text:'<span style="color: #0D0D0D;">Important ASAP</span>',
                                                type:'important_asap',
                                                name:'Important ASAP',
                                                handler(button){
                                                    me.createListUrgent(button,value.id_text)
                                                }
                                            },
                                            {
                                                text:'<span style="color: #0D0D0D;">Virtual Meeting</span>',
                                                type:'virtual_meeting',
                                                name:'Virtual Meeting',
                                                handler(button){
                                                    me.createListUrgent(button,value.id_text)
                                                }
                                            }
                                        ]
                                    }
                                  
                                   // html: '<img class="time" width="25" height="25" style="border-style:none;border:0px;border-color:#FFFFFF">'
                                },

                            ]
                        },
                        
                        {
                            xtype:'container',
                            padding:2,
                            width:'95%',
                            layout:{
                                type:'vbox'
                            },
                            items:[
                                {
                                    iconCls:'message',
                                    xtype:'datefield',
                                    name:'date_task',
                                    format:'d/m/Y',
                                    listeners:{
                                        afterrender: function(obj){
                                            let date=null
                                            if(value.date!=null)
                                            {
                                                date=value.date.split('/')
                                                function nextweek(){
                                                    var today = new Date();
                                                    var nextweek = new Date(date[2], date[1]-1, date[0]);
                                                    return nextweek;
                                                }
                                                console.log(nextweek())
                                                obj.setValue(nextweek());
                                            }
                                           
                                            obj.setMinValue(new Date())
                                        },
                                        change(obj,newValue,oldValue,eOpts){
                                            let date=`${newValue.getDate()}/${newValue.getMonth()+1}/${newValue.getYear()}`
                                            console.log(document.getElementById(`date-${value.id_text}`))
                                            document.getElementById(`date-${value.id_text}`).textContent=date
                                        }
                                    }
                                },
                                {
                                    xtype:'textarea',
                                    width:'90%',
                                    disabled:true,
                                    id:value.id_text,
                                    fieldStyle: 'background:none',
                                    value:value.message,
                                    emptyText: 'No Description',   
                                    listeners:{
                                        'render' : function(cmp) {
                                            cmp.getEl().on('keypress', function(e) {
                                                if (e.getKey() == e.ENTER) {
                                                    cmp.setDisabled(true)
                                                }
                                            });
                                            // cmp.getEl().on('click', function () {
                                            //     Ext.getCmp(value.id_text).setValue(true);
                                            // });
                                        }
                                    }
                                },
                                {
                                    xtype:'container',
                                    itemId:`list_urgent-${value.id_text}`,
                                    width:'90%',
                                    autoScroll:true,
                                    layout:{
                                        type:'hbox'
                                    },
                                }

                            ]
                        }
                    ]
               }
            ],
            listeners:{
               afterrender(obj){
                   document.getElementById(`title-${value.id_text}`).value=value.title
                
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
    createListUrgent(data,idcontainer){
        let me=this
        console.log(data.type)
        let button=Ext.create('Ext.button.Button',{
            iconCls:'close',
            margin:'2 0 0 2',
            height:15,
            itemId:`button-${data.type}-${idcontainer}`,
            style:{
                backgroundColor: '#F7BF1D',
                'background-image': 'none',
                borderColor:'#F7BF1D',
            },
            handler(button){
                //button.hide()
                button.hide();
                Ext.ComponentQuery.query(`#containurgent-${data.type}-${idcontainer}`)[0].hide()

            }
        })
        let container=Ext.create('Ext.container.Container',{
            margin:8,
            height:22,
            itemId:`containurgent-${data.type}-${idcontainer}`,
            layout:{
                type:'hbox'
            },
            style:{
                'background-color': '#F7BF1D',
                color             :'#FFFFFF',
                borderRadius      : '4px',
            },
            items:[
                {
                    xtype:'label',
                    margin:'2 0 0 4',
                    html:`<span style="font-size:10px;font-weight:bold;">${data.name}</span>`
                },button
            ]
        })
        Ext.ComponentQuery.query(`#list_urgent-${idcontainer}`)[0].add(container)
    }
  
});