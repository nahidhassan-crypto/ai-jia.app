import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  SafeAreaView, StatusBar, Switch, Alert, TextInput,
  KeyboardAvoidingView, Platform
} from 'react-native';

// ── TRANSLATIONS ──────────────────────────────────────────
const T = {
  en: {
    appName: 'AIjia Smart', appSub: 'AI-Powered Home',
    home: 'Home', devices: 'Devices', mesh: 'Mesh', messages: 'Messages', profile: 'Profile',
    welcome: 'Welcome to AIjia', welcomeSub: 'Your AI-powered smart home is active.',
    quickControls: 'Quick Controls', liveStatus: 'Live Status',
    temperature: 'Temperature', humidity: 'Humidity', security: 'Security',
    totalDevices: 'Total', online: 'Online', offline: 'Offline',
    allDevices: 'All Devices', active: 'active',
    meshNetwork: 'Mesh Network', activeNodes: 'Active Nodes', signalStrength: 'Signal',
    messages: 'Messages', typeMessage: 'Type a message...',
    settingsTitle: 'Settings', language: 'Language',
    signOut: 'Sign Out', signOutConfirm: 'Are you sure you want to sign out?',
    cancel: 'Cancel', confirm: 'Sign Out',
    daysActive: 'Days Active', friends: 'Friends',
    networkGood: 'Good', networkWeak: 'Weak', networkBad: 'Bad',
    notifications: 'Notifications', energySettings: 'Energy Settings',
    aiPreferences: 'AI Preferences', connectedApps: 'Connected Apps',
    helpSupport: 'Help & Support', aboutApp: 'About AIjia',
  },
  zh: {
    appName: 'AIjia 智能', appSub: 'AI智能家居',
    home: '主页', devices: '设备', mesh: '网络', messages: '消息', profile: '我的',
    welcome: '欢迎使用AIjia', welcomeSub: '您的AI智能家居正在运行中。',
    quickControls: '快速控制', liveStatus: '实时状态',
    temperature: '温度', humidity: '湿度', security: '安全',
    totalDevices: '总数', online: '在线', offline: '离线',
    allDevices: '所有设备', active: '在线',
    meshNetwork: '网状网络', activeNodes: '活跃节点', signalStrength: '信号',
    messages: '消息', typeMessage: '输入消息...',
    settingsTitle: '设置', language: '语言',
    signOut: '退出登录', signOutConfirm: '您确定要退出登录吗？',
    cancel: '取消', confirm: '退出',
    daysActive: '活跃天数', friends: '好友',
    networkGood: '良好', networkWeak: '较弱', networkBad: '很差',
    notifications: '通知', energySettings: '能源设置',
    aiPreferences: 'AI偏好', connectedApps: '已连接应用',
    helpSupport: '帮助与支持', aboutApp: '关于AIjia',
  }
};

// ── INITIAL DEVICES ───────────────────────────────────────
const INITIAL_DEVICES = [
  { id:1, name:'Living Room Light', nameZh:'客厅灯', icon:'💡', room:'Living Room', roomZh:'客厅', on:true,  online:true  },
  { id:2, name:'AC Unit',           nameZh:'空调',   icon:'❄️', room:'Bedroom',     roomZh:'卧室', on:true,  online:true  },
  { id:3, name:'Smart TV',          nameZh:'智能电视',icon:'📺', room:'Living Room', roomZh:'客厅', on:false, online:true  },
  { id:4, name:'Security Camera',   nameZh:'安全摄像头',icon:'📷',room:'Front Door', roomZh:'前门', on:true,  online:true  },
  { id:5, name:'Smart Speaker',     nameZh:'智能音箱',icon:'🔊', room:'Kitchen',    roomZh:'厨房', on:false, online:false },
  { id:6, name:'Robot Vacuum',      nameZh:'扫地机器人',icon:'🤖',room:'All Rooms', roomZh:'全屋', on:false, online:true  },
  { id:7, name:'Garden Sprinkler',  nameZh:'花园喷水',icon:'🌿', room:'Garden',     roomZh:'花园', on:true,  online:true  },
  { id:8, name:'Door Lock',         nameZh:'门锁',   icon:'🔐', room:'Main Door',  roomZh:'主门', on:true,  online:true  },
];

// ── INITIAL MESSAGES ──────────────────────────────────────
const INIT_CONVS = [
  { id:1, name:'AIjia Assistant', avatar:'🤖', lastMsg:'All systems normal.', time:'9:01 AM', unread:0,
    msgs:[
      { id:1, text:'Welcome to AIjia Smart Home! 🏠', sent:false, time:'8:00 AM' },
      { id:2, text:'All systems are normal and your home is secure.', sent:false, time:'9:01 AM' },
    ]},
  { id:2, name:'Family Group', avatar:'👨‍👩‍👧', lastMsg:'Mom: I turned on the AC', time:'8:45 AM', unread:2,
    msgs:[
      { id:1, text:'Dad: Coming home at 7pm', sent:false, time:'7:00 AM' },
      { id:2, text:'Okay! 👍', sent:true, time:'7:05 AM' },
      { id:3, text:'Mom: I turned on the AC', sent:false, time:'8:45 AM' },
    ]},
  { id:3, name:'Security Alert', avatar:'🔔', lastMsg:'Motion detected at front door', time:'Yesterday', unread:1,
    msgs:[
      { id:1, text:'⚠️ Motion detected at front door at 11:32 PM', sent:false, time:'Yesterday' },
    ]},
];

// ═══════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════
export default function App() {
  const [activeTab, setActiveTab]     = useState('Home');
  const [lang, setLang]               = useState('en');
  const [devices, setDevices]         = useState(INITIAL_DEVICES);
  const [networkStatus, setNetwork]   = useState('good');
  const [signalStrength, setSignal]   = useState(85);
  const [daysActive]                  = useState(47);
  const [friends]                     = useState(12);

  const t = T[lang];

  // Simulate live network & signal changes every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const options = ['good','good','good','weak','bad'];
      const newStatus = options[Math.floor(Math.random() * options.length)];
      setNetwork(newStatus);
      const base = newStatus === 'good' ? 75 : newStatus === 'weak' ? 45 : 25;
      setSignal(base + Math.floor(Math.random() * 20));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const toggleDevice = (id) => {
    setDevices(prev => prev.map(d =>
      d.id === id ? { ...d, on: !d.on, online: !d.on ? true : d.online } : d
    ));
  };

  const onlineCount = devices.filter(d => d.online).length;
  const totalCount  = devices.length;
  const netColor    = networkStatus === 'good' ? '#4ade80' : networkStatus === 'weak' ? '#fb923c' : '#f87171';
  const netLabel    = networkStatus === 'good' ? t.networkGood : networkStatus === 'weak' ? t.networkWeak : t.networkBad;

  const tabs = [
    { name:'Home',     icon:'🏠', label:t.home     },
    { name:'Devices',  icon:'📱', label:t.devices  },
    { name:'Mesh',     icon:'🌐', label:t.mesh     },
    { name:'Messages', icon:'💬', label:t.messages },
    { name:'Profile',  icon:'👤', label:t.profile  },
  ];

  const renderScreen = () => {
    switch (activeTab) {
      case 'Home':     return <HomeScreen     t={t} devices={devices} networkStatus={networkStatus} onlineCount={onlineCount} totalCount={totalCount} />;
      case 'Devices':  return <DevicesScreen  t={t} devices={devices} lang={lang} toggleDevice={toggleDevice} />;
      case 'Mesh':     return <MeshScreen     t={t} devices={devices} signalStrength={signalStrength} onlineCount={onlineCount} />;
      case 'Messages': return <MessagesScreen t={t} />;
      case 'Profile':  return <ProfileScreen  t={t} lang={lang} setLang={setLang} devices={devices} daysActive={daysActive} friends={friends} />;
    }
  };

  return (
    <SafeAreaView style={s.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a0533" />
      <View style={s.header}>
        <View>
          <Text style={s.headerTitle}>🏠 {t.appName}</Text>
          <Text style={s.headerSub}>{t.appSub}</Text>
        </View>
        <View style={[s.netBadge, { backgroundColor: netColor+'22', borderColor: netColor }]}>
          <View style={[s.netDot, { backgroundColor: netColor }]} />
          <Text style={[s.netText, { color: netColor }]}>{netLabel}</Text>
        </View>
      </View>
      {renderScreen()}
      <View style={s.bottomNav}>
        {tabs.map(tab => (
          <TouchableOpacity key={tab.name} style={s.navItem} onPress={() => setActiveTab(tab.name)}>
            <Text style={s.navIcon}>{tab.icon}</Text>
            <Text style={[s.navText, activeTab === tab.name && s.navActive]}>{tab.label}</Text>
            {activeTab === tab.name && <View style={s.navDot} />}
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

// ═══════════════════════════════════════════════════════════
// HOME SCREEN
// ═══════════════════════════════════════════════════════════
function HomeScreen({ t, devices, networkStatus, onlineCount, totalCount }) {
  const [securityOn, setSecurity] = useState(true);
  const netColor = networkStatus === 'good' ? '#4ade80' : networkStatus === 'weak' ? '#fb923c' : '#f87171';

  return (
    <ScrollView style={s.content}>
      <View style={s.heroCard}>
        <Text style={s.heroTitle}>👋 {t.welcome}</Text>
        <Text style={s.heroText}>{t.welcomeSub}</Text>
      </View>

      {/* Dynamic stats */}
      <View style={s.statsRow}>
        <View style={s.statBox}>
          <Text style={s.statNum}>{totalCount}</Text>
          <Text style={s.statLabel}>{t.totalDevices}</Text>
        </View>
        <View style={s.statBox}>
          <Text style={[s.statNum,{color:'#4ade80'}]}>{onlineCount}</Text>
          <Text style={s.statLabel}>{t.online}</Text>
        </View>
        <View style={s.statBox}>
          <Text style={[s.statNum,{color:'#f87171'}]}>{totalCount - onlineCount}</Text>
          <Text style={s.statLabel}>{t.offline}</Text>
        </View>
        <View style={s.statBox}>
          <Text style={[s.statNum,{color: netColor, fontSize:22}]}>●</Text>
          <Text style={[s.statLabel,{color: netColor}]}>{networkStatus === 'good' ? t.networkGood : networkStatus === 'weak' ? t.networkWeak : t.networkBad}</Text>
        </View>
      </View>

      <Text style={s.sectionTitle}>{t.quickControls}</Text>
      <View style={s.featuresGrid}>
        {[
          {icon:'🌡️', label:t.temperature, value:'24°C'},
          {icon:'💡', label:'Light',        value:'80%'},
          {icon:'🔒', label:t.security,    value:securityOn?'ON':'OFF'},
          {icon:'🎵', label:'Audio',        value:'OFF'},
          {icon:'📷', label:'Camera',       value:'Live'},
          {icon:'🌿', label:'Garden',       value:'Auto'},
        ].map(item => (
          <TouchableOpacity key={item.label} style={s.featureCard}>
            <Text style={s.featureIcon}>{item.icon}</Text>
            <Text style={s.featureLabel}>{item.label}</Text>
            <Text style={s.featureValue}>{item.value}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={s.sectionTitle}>{t.liveStatus}</Text>
      <View style={s.statsRow}>
        <View style={s.statBox}><Text style={s.statNum}>24°C</Text><Text style={s.statLabel}>{t.temperature}</Text></View>
        <View style={s.statBox}><Text style={s.statNum}>65%</Text><Text style={s.statLabel}>{t.humidity}</Text></View>
        <View style={s.statBox}>
          <Text style={[s.statNum,{color: securityOn?'#4ade80':'#f87171'}]}>{securityOn?'ON':'OFF'}</Text>
          <Text style={s.statLabel}>{t.security}</Text>
        </View>
      </View>
      <View style={s.switchRow}>
        <Text style={s.switchLabel}>🔒 {t.security}</Text>
        <Switch value={securityOn} onValueChange={setSecurity}
          trackColor={{false:'#3b0764',true:'#7c3aed'}}
          thumbColor={securityOn?'#c084fc':'#9ca3af'} />
      </View>
    </ScrollView>
  );
}

// ═══════════════════════════════════════════════════════════
// DEVICES SCREEN
// ═══════════════════════════════════════════════════════════
function DevicesScreen({ t, devices, lang, toggleDevice }) {
  const onlineCount = devices.filter(d => d.online).length;
  return (
    <ScrollView style={s.content}>
      <Text style={s.sectionTitle}>{t.allDevices} · {onlineCount} {t.active}</Text>
      {devices.map(device => (
        <View key={device.id} style={s.deviceCard}>
          <Text style={s.deviceIcon}>{device.icon}</Text>
          <View style={s.deviceInfo}>
            <Text style={s.deviceName}>{lang==='zh' ? device.nameZh : device.name}</Text>
            <Text style={s.deviceRoom}>{lang==='zh' ? device.roomZh : device.room}</Text>
            <View style={[s.onlineBadge,{backgroundColor: device.online?'#4ade8022':'#f8717122'}]}>
              <Text style={[s.onlineText,{color: device.online?'#4ade80':'#f87171'}]}>
                ● {device.online ? t.online : t.offline}
              </Text>
            </View>
          </View>
          <Switch value={device.on} onValueChange={() => toggleDevice(device.id)}
            trackColor={{false:'#3b0764',true:'#7c3aed'}}
            thumbColor={device.on?'#c084fc':'#9ca3af'} />
        </View>
      ))}
    </ScrollView>
  );
}

// ═══════════════════════════════════════════════════════════
// MESH NETWORK SCREEN
// ═══════════════════════════════════════════════════════════
function MeshScreen({ t, devices, signalStrength, onlineCount }) {
  const nodes = [
    { id:1, name:'Main Router',   icon:'📡', floor:'Floor 1',  strength: signalStrength },
    { id:2, name:'Bedroom Node',  icon:'🔵', floor:'Floor 2',  strength: Math.max(30, signalStrength-15) },
    { id:3, name:'Garden Node',   icon:'🟢', floor:'Outdoor',  strength: Math.max(20, signalStrength-25) },
    { id:4, name:'Kitchen Node',  icon:'🟡', floor:'Floor 1',  strength: Math.max(40, signalStrength-10) },
  ];
  const gc = (v) => v >= 70 ? '#4ade80' : v >= 45 ? '#fb923c' : '#f87171';
  const gl = (v) => v >= 70 ? t.networkGood : v >= 45 ? t.networkWeak : t.networkBad;
  const activeNodes = nodes.filter(n => n.strength > 20).length;

  return (
    <ScrollView style={s.content}>
      <View style={s.statsRow}>
        <View style={s.statBox}>
          <Text style={s.statNum}>{activeNodes}</Text>
          <Text style={s.statLabel}>{t.activeNodes}</Text>
        </View>
        <View style={s.statBox}>
          <Text style={[s.statNum,{color:'#4ade80'}]}>{onlineCount}</Text>
          <Text style={s.statLabel}>{t.online}</Text>
        </View>
        <View style={s.statBox}>
          <Text style={[s.statNum,{color: gc(signalStrength)}]}>{signalStrength}%</Text>
          <Text style={s.statLabel}>{t.signalStrength}</Text>
        </View>
      </View>

      <Text style={s.sectionTitle}>{t.meshNetwork}</Text>
      {nodes.map(node => (
        <View key={node.id} style={s.deviceCard}>
          <Text style={s.deviceIcon}>{node.icon}</Text>
          <View style={s.deviceInfo}>
            <Text style={s.deviceName}>{node.name}</Text>
            <Text style={s.deviceRoom}>{node.floor}</Text>
          </View>
          <View style={{alignItems:'flex-end'}}>
            <Text style={[s.statNum,{fontSize:18, color: gc(node.strength)}]}>{node.strength}%</Text>
            <Text style={[s.onlineText,{color: gc(node.strength)}]}>{gl(node.strength)}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

// ═══════════════════════════════════════════════════════════
// MESSAGES SCREEN
// ═══════════════════════════════════════════════════════════
function MessagesScreen({ t }) {
  const [convs, setConvs]       = useState(INIT_CONVS);
  const [activeChat, setActive] = useState(null);
  const [inputText, setInput]   = useState('');

  const sendMsg = () => {
    if (!inputText.trim()) return;
    const now = new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
    setConvs(prev => prev.map(c =>
      c.id === activeChat.id
        ? {...c, lastMsg:inputText, time:now, unread:0,
           msgs:[...c.msgs,{id:Date.now(),text:inputText,sent:true,time:now}]}
        : c
    ));
    setInput('');
  };

  if (activeChat) {
    const chat = convs.find(c => c.id === activeChat.id);
    return (
      <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS==='ios'?'padding':undefined}>
        <View style={s.chatHeader}>
          <TouchableOpacity onPress={() => setActive(null)} style={s.backBtn}>
            <Text style={s.backText}>‹</Text>
          </TouchableOpacity>
          <Text style={s.chatTitle}>{chat.avatar}  {chat.name}</Text>
        </View>
        <ScrollView style={s.chatMsgs} contentContainerStyle={{paddingBottom:16}}>
          {chat.msgs.map(msg => (
            <View key={msg.id} style={[s.msgBubble, msg.sent ? s.msgSent : s.msgRecv]}>
              <Text style={s.msgText}>{msg.text}</Text>
              <Text style={s.msgTime}>{msg.time}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={s.inputRow}>
          <TextInput style={s.textInput} value={inputText} onChangeText={setInput}
            placeholder={t.typeMessage} placeholderTextColor="#9ca3af" />
          <TouchableOpacity style={s.sendBtn} onPress={sendMsg}>
            <Text style={s.sendText}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }

  return (
    <ScrollView style={s.content}>
      <Text style={s.sectionTitle}>{t.messages}</Text>
      {convs.map(conv => (
        <TouchableOpacity key={conv.id} style={s.convCard} onPress={() => setActive(conv)}>
          <Text style={s.convAvatar}>{conv.avatar}</Text>
          <View style={s.convInfo}>
            <View style={s.convTop}>
              <Text style={s.convName}>{conv.name}</Text>
              <Text style={s.convTime}>{conv.time}</Text>
            </View>
            <View style={s.convBottom}>
              <Text style={s.convMsg} numberOfLines={1}>{conv.lastMsg}</Text>
              {conv.unread > 0 && (
                <View style={s.unreadBadge}>
                  <Text style={s.unreadText}>{conv.unread}</Text>
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

// ═══════════════════════════════════════════════════════════
// PROFILE SCREEN
// ═══════════════════════════════════════════════════════════
function ProfileScreen({ t, lang, setLang, devices, daysActive, friends }) {
  const stats = [
    { label: t.devices,    value: String(devices.length) },
    { label: t.friends,    value: String(friends)        },
    { label: t.daysActive, value: String(daysActive)     },
  ];

  const handleSignOut = () => {
    Alert.alert(
      t.signOut,
      t.signOutConfirm,
      [
        { text: t.cancel, style: 'cancel' },
        { text: t.confirm, style: 'destructive', onPress: () => Alert.alert('👋', 'Signed out successfully!') },
      ]
    );
  };

  const settings = [
    { icon:'🔔', label: t.notifications  },
    { icon:'⚡', label: t.energySettings },
    { icon:'🤖', label: t.aiPreferences  },
    { icon:'📱', label: t.connectedApps  },
    { icon:'❓', label: t.helpSupport    },
    { icon:'📋', label: t.aboutApp       },
  ];

  return (
    <ScrollView style={s.content}>
      <View style={s.profileHeader}>
        <View style={s.avatar}>
          <Text style={s.avatarText}>AI</Text>
        </View>
        <Text style={s.profileName}>AIjia Smart Home</Text>
        <Text style={s.profileSub}>Premium Plan · Active</Text>
      </View>

      {/* Dynamic stats */}
      <View style={s.statsRow}>
        {stats.map(st => (
          <View key={st.label} style={s.statBox}>
            <Text style={s.statNum}>{st.value}</Text>
            <Text style={s.statLabel}>{st.label}</Text>
          </View>
        ))}
      </View>

      {/* Language Selector */}
      <Text style={s.sectionTitle}>{t.language}</Text>
      <View style={s.langRow}>
        <TouchableOpacity style={[s.langBtn, lang==='en' && s.langBtnActive]} onPress={() => setLang('en')}>
          <Text style={[s.langText, lang==='en' && s.langTextActive]}>🇬🇧  English</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[s.langBtn, lang==='zh' && s.langBtnActive]} onPress={() => setLang('zh')}>
          <Text style={[s.langText, lang==='zh' && s.langTextActive]}>🇨🇳  中文</Text>
        </TouchableOpacity>
      </View>

      <Text style={s.sectionTitle}>{t.settingsTitle}</Text>
      {settings.map(item => (
        <TouchableOpacity key={item.label} style={s.settingRow}>
          <Text style={s.settingText}>{item.icon}  {item.label}</Text>
          <Text style={s.settingArrow}>›</Text>
        </TouchableOpacity>
      ))}

      {/* Sign Out with confirmation */}
      <TouchableOpacity style={s.signOutBtn} onPress={handleSignOut}>
        <Text style={s.signOutText}>🚪  {t.signOut}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ═══════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════
const s = StyleSheet.create({
  container:     { flex:1, backgroundColor:'#1a0533' },
  header:        { padding:16, paddingTop:8, backgroundColor:'#2d0a5e', flexDirection:'row', justifyContent:'space-between', alignItems:'center' },
  headerTitle:   { color:'#fff', fontSize:20, fontWeight:'bold' },
  headerSub:     { color:'#c084fc', fontSize:11, marginTop:2 },
  netBadge:      { flexDirection:'row', alignItems:'center', paddingHorizontal:10, paddingVertical:5, borderRadius:20, borderWidth:1 },
  netDot:        { width:8, height:8, borderRadius:4, marginRight:5 },
  netText:       { fontSize:12, fontWeight:'600' },
  content:       { flex:1, padding:16 },
  sectionTitle:  { color:'#c084fc', fontSize:11, fontWeight:'700', letterSpacing:1, marginTop:16, marginBottom:10, textTransform:'uppercase' },
  heroCard:      { backgroundColor:'#2d0a5e', borderRadius:16, padding:20, marginBottom:4 },
  heroTitle:     { color:'#fff', fontSize:18, fontWeight:'bold', marginBottom:8 },
  heroText:      { color:'#c084fc', fontSize:14, lineHeight:22 },
  featuresGrid:  { flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between' },
  featureCard:   { backgroundColor:'#2d0a5e', borderRadius:14, padding:12, width:'31%', marginBottom:10, alignItems:'center' },
  featureIcon:   { fontSize:22, marginBottom:4 },
  featureLabel:  { color:'#c084fc', fontSize:10, marginBottom:2 },
  featureValue:  { color:'#fff', fontSize:12, fontWeight:'bold' },
  statsRow:      { flexDirection:'row', justifyContent:'space-between', backgroundColor:'#2d0a5e', borderRadius:16, padding:14, marginBottom:4 },
  statBox:       { alignItems:'center', flex:1 },
  statNum:       { color:'#c084fc', fontSize:20, fontWeight:'bold' },
  statLabel:     { color:'#fff', fontSize:10, marginTop:4, textAlign:'center' },
  switchRow:     { backgroundColor:'#2d0a5e', borderRadius:14, padding:16, flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:16 },
  switchLabel:   { color:'#fff', fontSize:15 },
  deviceCard:    { backgroundColor:'#2d0a5e', borderRadius:14, padding:14, flexDirection:'row', alignItems:'center', marginBottom:10 },
  deviceIcon:    { fontSize:26, marginRight:12 },
  deviceInfo:    { flex:1 },
  deviceName:    { color:'#fff', fontSize:14, fontWeight:'600' },
  deviceRoom:    { color:'#c084fc', fontSize:12, marginTop:2 },
  onlineBadge:   { marginTop:5, paddingHorizontal:8, paddingVertical:2, borderRadius:10, alignSelf:'flex-start' },
  onlineText:    { fontSize:11, fontWeight:'600' },
  chatHeader:    { backgroundColor:'#2d0a5e', padding:14, flexDirection:'row', alignItems:'center' },
  backBtn:       { marginRight:12, padding:4 },
  backText:      { color:'#c084fc', fontSize:26, lineHeight:28 },
  chatTitle:     { color:'#fff', fontSize:16, fontWeight:'bold' },
  chatMsgs:      { flex:1, padding:16 },
  msgBubble:     { maxWidth:'80%', padding:12, borderRadius:16, marginBottom:8 },
  msgSent:       { backgroundColor:'#7c3aed', alignSelf:'flex-end', borderBottomRightRadius:4 },
  msgRecv:       { backgroundColor:'#2d0a5e', alignSelf:'flex-start', borderBottomLeftRadius:4 },
  msgText:       { color:'#fff', fontSize:14 },
  msgTime:       { color:'#c084fc88', fontSize:10, marginTop:4, textAlign:'right' },
  inputRow:      { flexDirection:'row', padding:12, backgroundColor:'#2d0a5e', alignItems:'center', borderTopWidth:1, borderTopColor:'#3b0764' },
  textInput:     { flex:1, backgroundColor:'#3b0764', borderRadius:20, paddingHorizontal:16, paddingVertical:8, color:'#fff', fontSize:14 },
  sendBtn:       { marginLeft:10, backgroundColor:'#7c3aed', width:40, height:40, borderRadius:20, justifyContent:'center', alignItems:'center' },
  sendText:      { color:'#fff', fontSize:16 },
  convCard:      { backgroundColor:'#2d0a5e', borderRadius:14, padding:14, flexDirection:'row', alignItems:'center', marginBottom:10 },
  convAvatar:    { fontSize:32, marginRight:12 },
  convInfo:      { flex:1 },
  convTop:       { flexDirection:'row', justifyContent:'space-between', marginBottom:4 },
  convName:      { color:'#fff', fontSize:15, fontWeight:'600' },
  convTime:      { color:'#9ca3af', fontSize:12 },
  convBottom:    { flexDirection:'row', alignItems:'center' },
  convMsg:       { color:'#c084fc', fontSize:13, flex:1 },
  unreadBadge:   { backgroundColor:'#7c3aed', borderRadius:10, minWidth:20, height:20, justifyContent:'center', alignItems:'center', paddingHorizontal:5 },
  unreadText:    { color:'#fff', fontSize:11, fontWeight:'bold' },
  profileHeader: { alignItems:'center', paddingVertical:20 },
  avatar:        { width:80, height:80, borderRadius:40, backgroundColor:'#7c3aed', justifyContent:'center', alignItems:'center', marginBottom:12 },
  avatarText:    { color:'#fff', fontSize:28, fontWeight:'bold' },
  profileName:   { color:'#fff', fontSize:20, fontWeight:'bold' },
  profileSub:    { color:'#c084fc', fontSize:13, marginTop:4 },
  langRow:       { flexDirection:'row', gap:12, marginBottom:8 },
  langBtn:       { flex:1, backgroundColor:'#2d0a5e', borderRadius:12, padding:14, alignItems:'center', borderWidth:1, borderColor:'#3b0764' },
  langBtnActive: { borderColor:'#c084fc', backgroundColor:'#3b0764' },
  langText:      { color:'#9ca3af', fontSize:14, fontWeight:'600' },
  langTextActive:{ color:'#c084fc' },
  settingRow:    { backgroundColor:'#2d0a5e', borderRadius:12, padding:16, flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:8 },
  settingText:   { color:'#fff', fontSize:14 },
  settingArrow:  { color:'#c084fc', fontSize:20 },
  signOutBtn:    { backgroundColor:'#450a0a', borderRadius:12, padding:16, alignItems:'center', marginTop:8, marginBottom:30, borderWidth:1, borderColor:'#f87171' },
  signOutText:   { color:'#f87171', fontSize:16, fontWeight:'bold' },
  bottomNav:     { flexDirection:'row', backgroundColor:'#2d0a5e', paddingVertical:6, borderTopWidth:1, borderTopColor:'#3b0764' },
  navItem:       { flex:1, alignItems:'center', paddingVertical:4 },
  navIcon:       { fontSize:18 },
  navText:       { color:'#9ca3af', fontSize:10, marginTop:1 },
  navActive:     { color:'#c084fc', fontWeight:'bold' },
  navDot:        { width:4, height:4, borderRadius:2, backgroundColor:'#c084fc', marginTop:2 },
});
