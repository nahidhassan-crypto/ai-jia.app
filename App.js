import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  SafeAreaView, StatusBar, Switch, Alert, TextInput,
  KeyboardAvoidingView, Platform
} from 'react-native';

const T = {
  en: {
    appName:'AIjia Smart', appSub:'AI Device Management',
    devices:'Devices', mesh:'Mesh', messages:'Messages', store:'Store', profile:'Profile',
    totalDevices:'Total Devices', online:'Online', network:'Network',
    networkNormal:'Normal', networkWeak:'Weak', networkBad:'Bad',
    quickActions:'Quick Actions', myDevices:'My Devices',
    addDevice:'Add Device', schedule:'Schedule', voiceMode:'Voice Mode', privacy:'Privacy',
    addNewDevice:'+ Add New Device', deviceOnline:'Online', deviceOffline:'Offline',
    meshTitle:'Mesh Network', meshSub:'Device Connections',
    hubConnected:'AIjia Hub — Connected', activeNodes:'Active Nodes',
    connectedDevices:'Connected Devices',
    excellentSignal:'Excellent Signal', goodSignal:'Good Signal', weakSignal:'Weak Signal',
    friendsTitle:'Friends', friendsSub:'Stay Connected', searchFriends:'Search friends...',
    typeMsg:'Type a message...',
    storeTitle:'Store', storeSub:'AIjia Products',
    newArrivals:'New Arrivals 🎉', newArrivalsSub:'Smart Neckband now available',
    products:'Products', shopNow:'Shop Now →', comingSoon:'Coming Soon',
    profileTitle:'My Profile', profileSub:'Account & Settings',
    userName:'AIjia User', userEmail:'user@ai-jia.ai',
    devicesLabel:'Devices', friendsLabel:'Friends', daysActiveLabel:'Days Active',
    accountSettings:'Account Settings', privacySafety:'Privacy & Safety',
    notifications:'Notifications', language:'Language',
    helpSupport:'Help & Support', aboutApp:'About AIjia', signOut:'Sign Out',
    signOutMsg:'Are you sure you want to sign out?', cancel:'Cancel',
  },
  zh: {
    appName:'AIjia 智能', appSub:'AI设备管理',
    devices:'设备', mesh:'网络', messages:'消息', store:'商城', profile:'我的',
    totalDevices:'总设备', online:'在线', network:'网络',
    networkNormal:'正常', networkWeak:'较弱', networkBad:'很差',
    quickActions:'快速操作', myDevices:'我的设备',
    addDevice:'添加设备', schedule:'定时', voiceMode:'语音', privacy:'隐私',
    addNewDevice:'+ 添加新设备', deviceOnline:'在线', deviceOffline:'离线',
    meshTitle:'网状网络', meshSub:'设备连接',
    hubConnected:'AIjia 中心 — 已连接', activeNodes:'活跃节点',
    connectedDevices:'已连接设备',
    excellentSignal:'信号极好', goodSignal:'信号良好', weakSignal:'信号较弱',
    friendsTitle:'好友', friendsSub:'保持联系', searchFriends:'搜索好友...',
    typeMsg:'输入消息...',
    storeTitle:'商城', storeSub:'AIjia产品',
    newArrivals:'新品上架 🎉', newArrivalsSub:'智能颈带现已上市',
    products:'产品', shopNow:'立即购买 →', comingSoon:'即将上线',
    profileTitle:'我的', profileSub:'账户与设置',
    userName:'AIjia用户', userEmail:'user@ai-jia.ai',
    devicesLabel:'设备', friendsLabel:'好友', daysActiveLabel:'活跃天数',
    accountSettings:'账户设置', privacySafety:'隐私与安全',
    notifications:'通知', language:'语言',
    helpSupport:'帮助与支持', aboutApp:'关于AIjia', signOut:'退出登录',
    signOutMsg:'确定要退出登录吗？', cancel:'取消',
  }
};

const DEVICES_INIT = [
  { id:1, icon:'🎤', name:'AI Microphone',   nameZh:'AI麦克风',    online:true,  on:true  },
  { id:2, icon:'😴', name:'AI Smart Pillow', nameZh:'AI智能枕头',  online:true,  on:true  },
  { id:3, icon:'🧸', name:'AI Smart Plush',  nameZh:'AI智能玩具',  online:false, on:false },
];

const FRIENDS_INIT = [
  { id:1, name:'Xiao Ming', initial:'M', color:'#7c3aed',
    lastMsg:'Hey, how have you been lately?', time:'10:30', unread:1,
    msgs:[{id:1,text:'Hey, how have you been lately?',sent:false,time:'10:30'}] },
  { id:2, name:'Xiao Hong', initial:'H', color:'#ec4899',
    lastMsg:'Want to play games together?', time:'Yesterday', unread:0,
    msgs:[{id:1,text:'Want to play games together?',sent:false,time:'Yesterday'}] },
  { id:3, name:'Xiao Li',   initial:'L', color:'#6b7280',
    lastMsg:'Thank you for your help!', time:'Monday', unread:0,
    msgs:[{id:1,text:'Thank you for your help!',sent:false,time:'Monday'}] },
  { id:4, name:'Xiao Zhang',initial:'Z', color:'#2563eb',
    lastMsg:'Are you free to chat sometime?', time:'Last week', unread:0,
    msgs:[{id:1,text:'Are you free to chat sometime?',sent:false,time:'Last week'}] },
];

function SignalBars({ strength }) {
  const bars = [
    { h:8,  on: strength>=10 },
    { h:14, on: strength>=30 },
    { h:20, on: strength>=55 },
    { h:26, on: strength>=75 },
  ];
  return (
    <View style={{flexDirection:'row',alignItems:'flex-end',gap:3}}>
      {bars.map((b,i)=>(
        <View key={i} style={{width:6,height:b.h,borderRadius:2,
          backgroundColor: b.on ? '#7c3aed' : '#2d0a5e'}} />
      ))}
    </View>
  );
}

export default function App() {
  const [tab,setTab]         = useState('Devices');
  const [lang,setLang]       = useState('en');
  const [devices,setDevices] = useState(DEVICES_INIT);
  const [net,setNet]         = useState('normal');
  const [signal,setSignal]   = useState(88);
  const [convs,setConvs]     = useState(FRIENDS_INIT);
  const [daysActive]         = useState(12);

  const t = T[lang];

  useEffect(()=>{
    const iv = setInterval(()=>{
      const opts=['normal','normal','normal','weak','bad'];
      const ns = opts[Math.floor(Math.random()*opts.length)];
      setNet(ns);
      setSignal(ns==='normal'?70+Math.floor(Math.random()*25):
                ns==='weak'  ?35+Math.floor(Math.random()*20):
                               15+Math.floor(Math.random()*15));
    },10000);
    return ()=>clearInterval(iv);
  },[]);

  const toggleDevice = id => setDevices(prev=>
    prev.map(d=>d.id===id?{...d,on:!d.on,online:!d.on?true:d.online}:d)
  );

  const onlineCount = devices.filter(d=>d.online).length;
  const netColor = net==='normal'?'#4ade80':net==='weak'?'#fb923c':'#f87171';
  const netLabel = net==='normal'?t.networkNormal:net==='weak'?t.networkWeak:t.networkBad;

  const tabs=[
    {key:'Devices', icon:'📱', label:t.devices },
    {key:'Mesh',    icon:'🔗', label:t.mesh    },
    {key:'Messages',icon:'💬', label:t.messages},
    {key:'Store',   icon:'🛍️', label:t.store   },
    {key:'Profile', icon:'👤', label:t.profile },
  ];

  const render=()=>{
    switch(tab){
      case'Devices':  return <DevicesScreen  t={t} devices={devices} onlineCount={onlineCount} netColor={netColor} netLabel={netLabel} toggleDevice={toggleDevice} lang={lang}/>;
      case'Mesh':     return <MeshScreen     t={t} devices={devices} signal={signal} onlineCount={onlineCount}/>;
      case'Messages': return <MessagesScreen t={t} convs={convs} setConvs={setConvs}/>;
      case'Store':    return <StoreScreen    t={t}/>;
      case'Profile':  return <ProfileScreen  t={t} lang={lang} setLang={setLang} devices={devices} friends={convs.length} daysActive={daysActive}/>;
    }
  };

  return (
    <SafeAreaView style={s.container}>
      <StatusBar barStyle="light-content" backgroundColor="#150428"/>
      {render()}
      <View style={s.bottomNav}>
        {tabs.map(tb=>(
          <TouchableOpacity key={tb.key} style={s.navItem} onPress={()=>setTab(tb.key)}>
            <Text style={s.navIcon}>{tb.icon}</Text>
            <Text style={[s.navText, tab===tb.key&&s.navActive]}>{tb.label}</Text>
            {tab===tb.key&&<View style={s.navLine}/>}
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

// ── DEVICES ───────────────────────────────────────────────
function DevicesScreen({t,devices,onlineCount,netColor,netLabel,toggleDevice,lang}){
  const qa=[
    {icon:'➕',label:t.addDevice},{icon:'⏰',label:t.schedule},
    {icon:'🎙️',label:t.voiceMode},{icon:'🛡️',label:t.privacy},
  ];
  return(
    <View style={s.screen}>
      <View style={s.header}>
        <View><Text style={s.headerTitle}>{t.appName}</Text><Text style={s.headerSub}>{t.appSub}</Text></View>
        <View style={{flexDirection:'row',gap:10}}>
          <TouchableOpacity style={s.iconBtn}><Text>🔔</Text></TouchableOpacity>
          <TouchableOpacity style={s.iconBtn}><Text>⚙️</Text></TouchableOpacity>
        </View>
      </View>
      <ScrollView style={s.content} showsVerticalScrollIndicator={false}>
        <View style={s.statsRow3}>
          <View style={s.stat3}><Text style={s.stat3Num}>{devices.length}</Text><Text style={s.stat3Lab}>{t.totalDevices}</Text></View>
          <View style={s.stat3}><Text style={s.stat3Num}>{onlineCount}</Text><Text style={s.stat3Lab}>{t.online}</Text></View>
          <View style={s.stat3}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',gap:5}}>
              <View style={[s.dot,{backgroundColor:netColor}]}/>
              <Text style={[s.stat3Num,{color:netColor,fontSize:15}]}>{netLabel}</Text>
            </View>
            <Text style={s.stat3Lab}>{t.network}</Text>
          </View>
        </View>

        <Text style={s.secTitle}>{t.quickActions}</Text>
        <View style={{flexDirection:'row',gap:10}}>
          {qa.map(q=>(
            <TouchableOpacity key={q.label} style={s.qaCard}>
              <Text style={{fontSize:24,marginBottom:6}}>{q.icon}</Text>
              <Text style={{color:'#fff',fontSize:11,textAlign:'center'}}>{q.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={s.secTitle}>{t.myDevices}</Text>
        {devices.map(d=>(
          <View key={d.id} style={s.devCard}>
            <View style={s.devIconBox}><Text style={{fontSize:26}}>{d.icon}</Text></View>
            <View style={{flex:1}}>
              <Text style={s.devName}>{lang==='zh'?d.nameZh:d.name}</Text>
              <View style={{flexDirection:'row',alignItems:'center',gap:5,marginTop:3}}>
                <View style={[s.dot,{backgroundColor:d.online?'#4ade80':'#f87171'}]}/>
                <Text style={{color:d.online?'#4ade80':'#f87171',fontSize:13}}>{d.online?t.deviceOnline:t.deviceOffline}</Text>
              </View>
            </View>
            <Switch value={d.on} onValueChange={()=>toggleDevice(d.id)}
              trackColor={{false:'#3b0764',true:'#7c3aed'}} thumbColor='#fff'/>
          </View>
        ))}

        <TouchableOpacity style={s.addBtn}>
          <Text style={{color:'#7c3aed',fontSize:15,fontWeight:'600'}}>{t.addNewDevice}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// ── MESH ──────────────────────────────────────────────────
function MeshScreen({t,devices,signal,onlineCount}){
  const sigLab = v => v>=75?t.excellentSignal:v>=45?t.goodSignal:t.weakSignal;
  const devSig = (d,base) => {
    if(!d.online) return 0;
    const off=[0,-12,-22];
    return Math.max(10, base+(off[d.id-1]||0));
  };
  return(
    <View style={s.screen}>
      <View style={s.header}>
        <View><Text style={s.headerTitle}>{t.meshTitle}</Text><Text style={s.headerSub}>{t.meshSub}</Text></View>
        <TouchableOpacity style={s.iconBtn}><Text>🔄</Text></TouchableOpacity>
      </View>
      <ScrollView style={s.content}>
        <View style={s.hubCard}>
          <View style={s.hubOuter}>
            <View style={s.hubMid}>
              <View style={s.hubInner}>
                <Text style={{fontSize:42}}>📡</Text>
              </View>
            </View>
          </View>
          <Text style={{color:'#fff',fontSize:16,fontWeight:'600',marginTop:16,marginBottom:10}}>{t.hubConnected}</Text>
          <View style={s.nodesPill}>
            <View style={[s.dot,{backgroundColor:'#c084fc'}]}/>
            <Text style={{color:'#c084fc',fontSize:14,fontWeight:'600'}}>{onlineCount} {t.activeNodes}</Text>
          </View>
        </View>

        <Text style={s.secTitle}>{t.connectedDevices}</Text>
        {devices.map(d=>{
          const ds = devSig(d,signal);
          return(
            <View key={d.id} style={s.devCard}>
              <View style={s.devIconBox}><Text style={{fontSize:26}}>{d.icon}</Text></View>
              <View style={{flex:1}}>
                <Text style={s.devName}>{d.name}</Text>
                <Text style={{color:d.online?'#9ca3af':'#f87171',fontSize:13,marginTop:3}}>
                  {d.online ? sigLab(ds) : t.deviceOffline+' · 2h ago'}
                </Text>
              </View>
              <SignalBars strength={ds}/>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

// ── MESSAGES ──────────────────────────────────────────────
function MessagesScreen({t,convs,setConvs}){
  const [chat,setChat]   = useState(null);
  const [input,setInput] = useState('');
  const [search,setSrch] = useState('');

  const send = ()=>{
    if(!input.trim()) return;
    const now = new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
    setConvs(prev=>prev.map(c=>c.id===chat.id
      ?{...c,lastMsg:input,time:now,unread:0,msgs:[...c.msgs,{id:Date.now(),text:input,sent:true,time:now}]}:c));
    setInput('');
  };

  if(chat){
    const cv = convs.find(c=>c.id===chat.id);
    return(
      <KeyboardAvoidingView style={{flex:1,backgroundColor:'#150428'}} behavior={Platform.OS==='ios'?'padding':undefined}>
        <View style={s.chatHdr}>
          <TouchableOpacity onPress={()=>setChat(null)} style={{marginRight:12}}>
            <Text style={{color:'#c084fc',fontSize:28,lineHeight:30}}>‹</Text>
          </TouchableOpacity>
          <View style={[s.fAvatar,{backgroundColor:chat.color,width:36,height:36,borderRadius:18}]}>
            <Text style={s.fInit}>{chat.initial}</Text>
          </View>
          <Text style={[s.headerTitle,{marginLeft:10}]}>{chat.name}</Text>
        </View>
        <ScrollView style={{flex:1,padding:16}}>
          {cv.msgs.map(m=>(
            <View key={m.id} style={[s.bubble,m.sent?s.bSent:s.bRecv]}>
              <Text style={{color:'#fff',fontSize:14}}>{m.text}</Text>
              <Text style={{color:'#ffffff55',fontSize:10,marginTop:4,textAlign:'right'}}>{m.time}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={s.inputRow}>
          <TextInput style={s.tinput} value={input} onChangeText={setInput}
            placeholder={t.typeMsg} placeholderTextColor="#9ca3af" multiline/>
          <TouchableOpacity style={s.sendBtn} onPress={send}>
            <Text style={{color:'#fff',fontSize:16}}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }

  const filtered = convs.filter(c=>c.name.toLowerCase().includes(search.toLowerCase()));
  return(
    <View style={s.screen}>
      <View style={s.header}>
        <View><Text style={s.headerTitle}>{t.friendsTitle}</Text><Text style={s.headerSub}>{t.friendsSub}</Text></View>
        <TouchableOpacity style={s.iconBtn}><Text style={{fontSize:20,color:'#fff',fontWeight:'300'}}>＋</Text></TouchableOpacity>
      </View>
      <View style={s.srchBox}>
        <Text style={{fontSize:16,marginRight:8}}>🔍</Text>
        <TextInput style={{flex:1,color:'#fff',fontSize:14}} value={search} onChangeText={setSrch}
          placeholder={t.searchFriends} placeholderTextColor="#6b7280"/>
      </View>
      <ScrollView style={s.content}>
        {filtered.map(c=>(
          <TouchableOpacity key={c.id} style={s.fRow} onPress={()=>setChat(c)}>
            <View style={[s.fAvatar,{backgroundColor:c.color}]}><Text style={s.fInit}>{c.initial}</Text></View>
            <View style={{flex:1}}>
              <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:4}}>
                <Text style={{color:'#fff',fontSize:15,fontWeight:'600'}}>{c.name}</Text>
                <Text style={{color:'#9ca3af',fontSize:12}}>{c.time}</Text>
              </View>
              <Text style={{color:'#9ca3af',fontSize:13}} numberOfLines={1}>{c.lastMsg}</Text>
            </View>
            {c.unread>0&&<View style={s.unread}><Text style={{color:'#fff',fontSize:11,fontWeight:'bold'}}>{c.unread}</Text></View>}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

// ── STORE ─────────────────────────────────────────────────
function StoreScreen({t}){
  const products=[
    {icon:'😴',name:'Smart Pillow',avail:true},
    {icon:'🧸',name:'Smart Plush', avail:true},
    {icon:'🌐',name:'Neckband',    avail:true},
    {icon:'🎤',name:'AI Mic',      avail:false},
  ];
  return(
    <View style={s.screen}>
      <View style={s.header}>
        <View><Text style={s.headerTitle}>{t.storeTitle}</Text><Text style={s.headerSub}>{t.storeSub}</Text></View>
        <TouchableOpacity style={s.iconBtn}><Text>🛒</Text></TouchableOpacity>
      </View>
      <ScrollView style={s.content}>
        <View style={s.banner}>
          <View style={{flex:1}}>
            <Text style={{color:'#fff',fontSize:16,fontWeight:'bold',marginBottom:4}}>{t.newArrivals}</Text>
            <Text style={{color:'#c084fc',fontSize:13}}>{t.newArrivalsSub}</Text>
          </View>
          <Text style={{fontSize:38}}>🌐</Text>
        </View>
        <Text style={s.secTitle}>{t.products}</Text>
        <View style={{flexDirection:'row',flexWrap:'wrap',gap:12,paddingBottom:20}}>
          {products.map(p=>(
            <TouchableOpacity key={p.name} style={s.prodCard}>
              <Text style={{fontSize:48,marginBottom:10}}>{p.icon}</Text>
              <Text style={{color:'#fff',fontSize:15,fontWeight:'bold',marginBottom:6}}>{p.name}</Text>
              <Text style={{color:p.avail?'#7c3aed':'#6b7280',fontSize:13}}>{p.avail?t.shopNow:t.comingSoon}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

// ── PROFILE ───────────────────────────────────────────────
function ProfileScreen({t,lang,setLang,devices,friends,daysActive}){
  const [showLang,setShowLang]=useState(false);

  const handleSignOut=()=>{
    Alert.alert(t.signOut, t.signOutMsg,[
      {text:t.cancel,style:'cancel'},
      {text:t.signOut,style:'destructive',onPress:()=>{}},
    ]);
  };

  const settings=[
    {icon:'⚙️',color:'#7c3aed',label:t.accountSettings},
    {icon:'🛡️',color:'#6366f1',label:t.privacySafety},
    {icon:'🔔',color:'#eab308',label:t.notifications},
    {icon:'🌐',color:'#2563eb',label:t.language,special:'lang'},
    {icon:'❓',color:'#0891b2',label:t.helpSupport},
    {icon:'📋',color:'#9ca3af',label:t.aboutApp},
  ];

  return(
    <View style={s.screen}>
      <View style={s.header}>
        <View><Text style={s.headerTitle}>{t.profileTitle}</Text><Text style={s.headerSub}>{t.profileSub}</Text></View>
        <TouchableOpacity style={s.iconBtn}><Text>✏️</Text></TouchableOpacity>
      </View>
      <ScrollView style={s.content}>
        <View style={{alignItems:'center',paddingVertical:20}}>
          <View style={s.profAv}><Text style={{fontSize:42}}>👤</Text></View>
          <Text style={{color:'#fff',fontSize:20,fontWeight:'bold',marginTop:10}}>{t.userName}</Text>
          <Text style={{color:'#9ca3af',fontSize:13,marginTop:4}}>{t.userEmail}</Text>
        </View>

        <View style={s.statsRow3}>
          <View style={s.stat3}><Text style={[s.stat3Num,{color:'#c084fc'}]}>{devices.length}</Text><Text style={s.stat3Lab}>{t.devicesLabel}</Text></View>
          <View style={s.stat3}><Text style={[s.stat3Num,{color:'#c084fc'}]}>{friends}</Text><Text style={s.stat3Lab}>{t.friendsLabel}</Text></View>
          <View style={s.stat3}><Text style={[s.stat3Num,{color:'#c084fc'}]}>{daysActive}</Text><Text style={s.stat3Lab}>{t.daysActiveLabel}</Text></View>
        </View>

        <View style={{marginTop:16}}>
          {settings.map(item=>(
            <View key={item.label}>
              <TouchableOpacity style={s.setItem}
                onPress={item.special==='lang'?()=>setShowLang(!showLang):undefined}>
                <View style={[s.setIconBox,{backgroundColor:item.color+'33'}]}>
                  <Text style={{fontSize:20}}>{item.icon}</Text>
                </View>
                <Text style={{color:'#fff',fontSize:15,flex:1}}>{item.label}</Text>
                <Text style={{color:'#6b7280',fontSize:20}}>›</Text>
              </TouchableOpacity>
              {item.special==='lang'&&showLang&&(
                <View style={s.langDrop}>
                  {[{code:'en',label:'🇬🇧  English'},{code:'zh',label:'🇨🇳  中文'}].map(l=>(
                    <TouchableOpacity key={l.code} style={s.langOpt}
                      onPress={()=>{setLang(l.code);setShowLang(false);}}>
                      <Text style={{color:lang===l.code?'#c084fc':'#fff',fontSize:14}}>{l.label}</Text>
                      {lang===l.code&&<Text style={{color:'#c084fc'}}>✓</Text>}
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>

        <TouchableOpacity style={s.soBtn} onPress={handleSignOut}>
          <Text style={{color:'#f87171',fontSize:15,fontWeight:'bold'}}>🚪  {t.signOut}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// ── STYLES ────────────────────────────────────────────────
const s = StyleSheet.create({
  container:  {flex:1,backgroundColor:'#150428'},
  screen:     {flex:1},
  header:     {flexDirection:'row',justifyContent:'space-between',alignItems:'center',
               paddingHorizontal:20,paddingVertical:16,backgroundColor:'#150428'},
  headerTitle:{color:'#fff',fontSize:22,fontWeight:'bold'},
  headerSub:  {color:'#9ca3af',fontSize:13,marginTop:2},
  iconBtn:    {width:42,height:42,borderRadius:21,backgroundColor:'#1e0a38',
               justifyContent:'center',alignItems:'center'},
  content:    {flex:1,paddingHorizontal:16},
  secTitle:   {color:'#fff',fontSize:16,fontWeight:'700',marginTop:20,marginBottom:12},
  dot:        {width:8,height:8,borderRadius:4},

  statsRow3:  {flexDirection:'row',gap:10,marginTop:8},
  stat3:      {flex:1,backgroundColor:'#1e0a38',borderRadius:16,padding:14,alignItems:'center'},
  stat3Num:   {color:'#fff',fontSize:22,fontWeight:'bold',textAlign:'center'},
  stat3Lab:   {color:'#9ca3af',fontSize:12,marginTop:4,textAlign:'center'},

  qaCard:     {flex:1,backgroundColor:'#1e0a38',borderRadius:16,padding:12,alignItems:'center'},
  devCard:    {backgroundColor:'#1e0a38',borderRadius:16,padding:14,
               flexDirection:'row',alignItems:'center',marginBottom:10},
  devIconBox: {width:52,height:52,borderRadius:14,backgroundColor:'#2d0a5e',
               justifyContent:'center',alignItems:'center',marginRight:14},
  devName:    {color:'#fff',fontSize:15,fontWeight:'600'},
  addBtn:     {borderWidth:1.5,borderColor:'#7c3aed',borderStyle:'dashed',
               borderRadius:16,padding:16,alignItems:'center',marginBottom:20,marginTop:4},

  hubCard:    {backgroundColor:'#1e0a38',borderRadius:20,padding:24,alignItems:'center',marginBottom:8},
  hubOuter:   {width:160,height:160,borderRadius:80,borderWidth:1.5,borderColor:'#2d0a5e',
               justifyContent:'center',alignItems:'center'},
  hubMid:     {width:120,height:120,borderRadius:60,borderWidth:1.5,borderColor:'#3b0764',
               justifyContent:'center',alignItems:'center'},
  hubInner:   {width:80,height:80,borderRadius:40,borderWidth:1.5,borderColor:'#4b1284',
               justifyContent:'center',alignItems:'center'},
  nodesPill:  {flexDirection:'row',alignItems:'center',gap:6,backgroundColor:'#2d0a5e',
               paddingHorizontal:16,paddingVertical:8,borderRadius:20},

  srchBox:    {flexDirection:'row',alignItems:'center',backgroundColor:'#1e0a38',
               marginHorizontal:16,marginVertical:10,borderRadius:14,
               paddingHorizontal:14,paddingVertical:12},
  fRow:       {flexDirection:'row',alignItems:'center',paddingVertical:12,
               borderBottomWidth:1,borderBottomColor:'#1e0a38'},
  fAvatar:    {width:50,height:50,borderRadius:25,justifyContent:'center',
               alignItems:'center',marginRight:12},
  fInit:      {color:'#fff',fontSize:20,fontWeight:'bold'},
  unread:     {width:22,height:22,borderRadius:11,backgroundColor:'#7c3aed',
               justifyContent:'center',alignItems:'center'},
  chatHdr:    {flexDirection:'row',alignItems:'center',backgroundColor:'#150428',
               paddingHorizontal:16,paddingVertical:12},
  bubble:     {maxWidth:'78%',padding:12,borderRadius:18,marginBottom:8},
  bSent:      {backgroundColor:'#7c3aed',alignSelf:'flex-end',borderBottomRightRadius:4},
  bRecv:      {backgroundColor:'#1e0a38',alignSelf:'flex-start',borderBottomLeftRadius:4},
  inputRow:   {flexDirection:'row',padding:12,backgroundColor:'#1e0a38',
               alignItems:'center',gap:10},
  tinput:     {flex:1,backgroundColor:'#2d0a5e',borderRadius:22,
               paddingHorizontal:16,paddingVertical:10,color:'#fff',fontSize:14},
  sendBtn:    {width:42,height:42,borderRadius:21,backgroundColor:'#7c3aed',
               justifyContent:'center',alignItems:'center'},

  banner:     {backgroundColor:'#2d0a5e',borderRadius:16,padding:20,
               flexDirection:'row',alignItems:'center',marginBottom:8},
  prodCard:   {width:'47%',backgroundColor:'#1e0a38',borderRadius:16,padding:16},

  profAv:     {width:90,height:90,borderRadius:45,backgroundColor:'#7c3aed',
               justifyContent:'center',alignItems:'center'},
  setItem:    {backgroundColor:'#1e0a38',borderRadius:14,padding:14,
               flexDirection:'row',alignItems:'center',marginBottom:8},
  setIconBox: {width:40,height:40,borderRadius:12,justifyContent:'center',
               alignItems:'center',marginRight:14},
  langDrop:   {backgroundColor:'#2d0a5e',borderRadius:12,marginBottom:8,overflow:'hidden'},
  langOpt:    {flexDirection:'row',justifyContent:'space-between',alignItems:'center',
               padding:14,borderBottomWidth:1,borderBottomColor:'#3b076455'},
  soBtn:      {backgroundColor:'#1a0000',borderRadius:14,padding:16,alignItems:'center',
               marginTop:8,marginBottom:30,borderWidth:1,borderColor:'#f87171'},

  bottomNav:  {flexDirection:'row',backgroundColor:'#150428',paddingVertical:8,
               borderTopWidth:1,borderTopColor:'#1e0a38',
               paddingBottom:Platform.OS==='ios'?20:8},
  navItem:    {flex:1,alignItems:'center'},
  navIcon:    {fontSize:20},
  navText:    {color:'#6b7280',fontSize:10,marginTop:2},
  navActive:  {color:'#c084fc',fontWeight:'bold'},
  navLine:    {width:20,height:2,backgroundColor:'#c084fc',borderRadius:1,marginTop:3},
});
