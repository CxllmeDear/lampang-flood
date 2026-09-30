// ฟังก์ชันดึงข้อมูลที่รองรับทั้งบนเครื่อง (localhost) และบน Vercel Cloud
async function getWaterData() {
  // ข้อมูลกลางของระบบเตือนภัยลำปาง
  return {
    updatedAt: "30 ก.ย. 2026 20:00 น.",
    overallAlert: {
      level: "warning",
      title: "แจ้งเตือนเฝ้าระวังระดับน้ำแม่น้ำวัง",
      message:
        "เขื่อนกิ่วคอหมา (95%) และเขื่อนกิ่วลม (92%) อยู่ในเกณฑ์สูงมาก และมีการระบายน้ำลงสู่แม่น้ำวังต่อเนื่อง ขอให้จุดรับน้ำเขต อ.เมือง, อ.เกาะคา, สบจาง (อ.แม่ทะ) และ อ.เถิน เฝ้าระวังใกล้ชิด",
    },
    dams: [
      {
        id: "dam-01",
        name: "เขื่อนกิ่วคอหมา",
        location: "อ.แจ้ห่ม จ.ลำปาง",
        percent: 95,
        storage: 162,
        inflow: 1.06,
        outflow: 0.39,
        status: "critical",
        statusText: "วิกฤต (ความจุสูงเกิน 90%)",
      },
      {
        id: "dam-02",
        name: "เขื่อนกิ่วลม",
        location: "อ.เมือง จ.ลำปาง",
        percent: 92,
        storage: 98,
        inflow: 3.35,
        outflow: 2.10,
        status: "critical",
        statusText: "วิกฤต (น้ำเข้าต่อเนื่อง)",
      },
      {
        id: "dam-03",
        name: "เขื่อนแม่มอก",
        location: "อ.เถิน จ.ลำปาง",
        percent: 70,
        storage: 77,
        inflow: 5.27,
        outflow: 0.09,
        status: "normal",
        statusText: "ปกติ (กักเก็บรับน้ำป่าได้ดี)",
      },
    ],
    stations: [
      {
        id: "WANG01",
        river: "แม่น้ำวัง",
        name: "สะพานเสตุวารี (ตัวเมืองลำปาง)",
        district: "อ.เมืองลำปาง",
        waterLevel: 3.20,
        bankLevel: 4.50,
        diff: 1.30,
        status: "warning",
        statusLabel: "เฝ้าระวัง",
        note: "รับน้ำจากกิ่วลมโดยตรง ระดับน้ำทรงตัวสูง",
      },
      {
        id: "JANG01",
        river: "ลำน้ำแม่จาง / แม่น้ำวัง",
        name: "จุดบรรจบแม่น้ำวัง (สบจาง - แม่ทะ)",
        district: "อ.แม่ทะ (ใกล้โซนนาครัว)",
        waterLevel: 2.80,
        bankLevel: 4.00,
        diff: 1.20,
        status: "warning",
        statusLabel: "เฝ้าระวังน้ำหนุน",
        note: "ระบายลงแม่น้ำวังได้ช้า เนื่องจากแม่น้ำวังมีระดับสูง",
      },
      {
        id: "WANG02",
        river: "แม่น้ำวัง",
        name: "สะพานข้ามแม่น้ำวัง อ.เกาะคา",
        district: "อ.เกาะคา",
        waterLevel: 3.90,
        bankLevel: 5.20,
        diff: 1.30,
        status: "normal",
        statusLabel: "ปกติ",
        note: "การไหลของน้ำยังคล่องตัว ยังไม่ล้นตลิ่ง",
      },
      {
        id: "WANG03",
        river: "แม่น้ำวัง",
        name: "จุดวัดน้ำ อ.เถิน (ท้ายน้ำลำปาง)",
        district: "อ.เถิน",
        waterLevel: 4.10,
        bankLevel: 6.00,
        diff: 1.90,
        status: "normal",
        statusLabel: "ปกติ",
        note: "รับมวลน้ำสะสมจากตอนบน ไหลมุ่งหน้าเขื่อนภูมิพล",
      },
    ],
  };
}

export default async function Home() {
  const data = await getWaterData();
  const { dams, stations, overallAlert, updatedAt } = data;

  const criticalDamsCount = dams.filter((d: any) => d.status === "critical").length;
  const warningStationsCount = stations.filter((s: any) => s.status === "warning").length;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans selection:bg-cyan-500 selection:text-white relative overflow-hidden">
      {/* วงแหวนแสงเรืองรองด้านหลัง (Background Ambient Glow) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Navigation / Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 backdrop-blur-md bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-2xl shadow-lg shadow-cyan-500/20">
              🌊
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
                  LAMPANG FLOOD WATCH
                </h1>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  LIVE
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                ศูนย์เฝ้าระวังและติดตามสถานการณ์ลุ่มน้ำวัง จ.ลำปาง
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700/80 px-3.5 py-1.5 rounded-full text-xs shadow-inner">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-300 font-medium">อัปเดตล่าสุด: {updatedAt}</span>
            </div>
          </div>
        </header>

        {/* Highlight Stats แถบตัวเลขสรุปเร็ว */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          <div className="bg-slate-900/50 backdrop-blur border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between">
            <span className="text-xs text-slate-400 font-medium">เขื่อนหลักทั้งหมด</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">{dams.length}</span>
              <span className="text-xs text-slate-500">แห่ง</span>
            </div>
          </div>
          <div className="bg-red-950/20 backdrop-blur border border-red-900/40 rounded-xl p-4 flex flex-col justify-between">
            <span className="text-xs text-red-300 font-medium">เขื่อนระดับวิกฤต (&gt;90%)</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-red-400">{criticalDamsCount}</span>
              <span className="text-xs text-red-300/60">แห่ง (กิ่วคอหมา/กิ่วลม)</span>
            </div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between">
            <span className="text-xs text-slate-400 font-medium">สถานีวัดน้ำในลำน้ำ</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">{stations.length}</span>
              <span className="text-xs text-slate-500">จุดตรวจวัด</span>
            </div>
          </div>
          <div className="bg-amber-950/20 backdrop-blur border border-amber-900/40 rounded-xl p-4 flex flex-col justify-between">
            <span className="text-xs text-amber-300 font-medium">จุดที่ต้องเฝ้าระวัง</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-amber-400">{warningStationsCount}</span>
              <span className="text-xs text-amber-300/60">จุด (ในเมือง / แม่ทะ)</span>
            </div>
          </div>
        </section>

        {/* แจ้งเตือนสภาวะวิกฤต (Emergency Warning Banner) */}
        <section className="relative overflow-hidden rounded-2xl border border-red-500/40 bg-gradient-to-r from-red-950/60 via-red-900/20 to-slate-900/80 p-5 md:p-6 backdrop-blur-md shadow-2xl shadow-red-950/40">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-2xl flex-shrink-0 animate-bounce">
              ⚠️
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-red-500 text-white shadow-sm">
                  สถานะเตือนภัย
                </span>
                <h2 className="text-base md:text-lg font-bold text-red-200">
                  {overallAlert.title}
                </h2>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {overallAlert.message}
              </p>
            </div>
          </div>
        </section>

        {/* ส่วนที่ 1: การ์ดสถานการณ์ 3 เขื่อนหลัก */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 text-lg">
                🏞️
              </span>
              <div>
                <h3 className="text-lg font-bold text-slate-100">สถานะความจุ 3 เขื่อนหลัก</h3>
                <p className="text-xs text-slate-400">เกณฑ์กักเก็บและอัตราการระบายน้ำประจำวัน</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {dams.map((dam: any) => {
              const isCritical = dam.status === "critical";
              const accentColor = isCritical ? "from-red-500 to-rose-600" : "from-cyan-500 to-blue-600";
              const ringColor = isCritical ? "border-red-500/40" : "border-cyan-500/40";
              const tagStyle = isCritical
                ? "bg-red-500/10 text-red-400 border-red-500/30"
                : "bg-cyan-500/10 text-cyan-400 border-cyan-500/30";

              return (
                <div
                  key={dam.id}
                  className="group relative bg-slate-900/70 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/5 flex flex-col justify-between"
                >
                  <div>
                    {/* Dam Title & Percent Ring */}
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-base md:text-lg text-slate-100 group-hover:text-cyan-300 transition-colors">
                          {dam.name}
                        </h4>
                        <span className="text-xs text-slate-400">{dam.location}</span>
                      </div>
                      <div className={`px-2.5 py-1 rounded-full text-xs font-bold border ${tagStyle}`}>
                        {dam.percent}%
                      </div>
                    </div>

                    {/* Gauge Bar */}
                    <div className="my-4">
                      <div className="flex justify-between text-[11px] text-slate-400 mb-1.5">
                        <span>ระดับน้ำในอ่าง</span>
                        <span className="font-semibold text-slate-200">{dam.storage} ล้าน ลบ.ม.</span>
                      </div>
                      <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${accentColor} transition-all duration-1000 shadow-sm`}
                          style={{ width: `${Math.min(dam.percent, 100)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                        <span>0%</span>
                        <span className="text-amber-500/80">เฝ้าระวัง 80%</span>
                        <span className="text-red-500/80">เต็ม 100%</span>
                      </div>
                    </div>

                    {/* Stats Flow */}
                    <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 mb-3">
                      <div>
                        <span className="text-slate-500 block text-[11px]">น้ำไหลเข้าอ่าง</span>
                        <span className="font-semibold text-emerald-400 flex items-center gap-1 mt-0.5">
                          ↓ +{dam.inflow} <span className="text-[10px] font-normal text-slate-400">ล้าน/วัน</span>
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[11px]">อัตราการระบาย</span>
                        <span className="font-semibold text-amber-400 flex items-center gap-1 mt-0.5">
                          ↑ -{dam.outflow} <span className="text-[10px] font-normal text-slate-400">ล้าน/วัน</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-400 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span>สถานะ:</span>
                    <span className={isCritical ? "text-red-400 font-medium" : "text-cyan-400 font-medium"}>
                      {dam.statusText}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ส่วนที่ 2: ระดับน้ำในแม่น้ำวังและลำน้ำสาขา */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-lg">
              📏
            </span>
            <div>
              <h3 className="text-lg font-bold text-slate-100">ระดับน้ำในแม่น้ำวัง & จุดเฝ้าระวังสำคัญ</h3>
              <p className="text-xs text-slate-400">เปรียบเทียบระดับน้ำจริงกับขอบตลิ่งของแต่ละอำเภอ</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stations.map((station: any) => {
              const isWarn = station.status === "warning";
              const alertBg = isWarn
                ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                : "bg-emerald-500/10 text-emerald-300 border-emerald-500/30";

              // คำนวณความสูงของน้ำในรูปแบบ % เทียบกับตลิ่ง
              const waterPercent = Math.min(Math.round((station.waterLevel / station.bankLevel) * 100), 100);

              return (
                <div
                  key={station.id}
                  className="bg-slate-900/70 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-5 backdrop-blur-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <div>
                        <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider block">
                          {station.river}
                        </span>
                        <h4 className="font-bold text-base text-slate-100 mt-0.5">
                          {station.name}
                        </h4>
                        <span className="text-xs text-slate-400">{station.district}</span>
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${alertBg}`}>
                        {station.statusLabel}
                      </span>
                    </div>

                    {/* กราฟิกจำลองระดับน้ำในแม่น้ำ */}
                    <div className="my-4 bg-slate-950/70 rounded-xl p-3 border border-slate-800/80 space-y-2">
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>ความสูงของน้ำ: <strong className="text-white">{station.waterLevel} ม.</strong></span>
                        <span>ระดับขอบตลิ่ง: <strong className="text-slate-400">{station.bankLevel} ม.</strong></span>
                      </div>

                      {/* หลอดแสดงระดับน้ำ */}
                      <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden relative">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            isWarn
                              ? "bg-gradient-to-r from-amber-500 to-orange-500"
                              : "bg-gradient-to-r from-teal-500 to-emerald-500"
                          }`}
                          style={{ width: `${waterPercent}%` }}
                        ></div>
                      </div>

                      <div className="flex justify-between items-center pt-1">
                        <span className="text-[11px] text-slate-400">ปริมาตรตลิ่งที่รองรับได้</span>
                        <span className={`text-xs font-bold ${isWarn ? "text-amber-400" : "text-emerald-400"}`}>
                          ต่ำกว่าตลิ่ง {station.diff.toFixed(2)} ม.
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-400 pt-2.5 border-t border-slate-800/80 flex items-start gap-2">
                    <span className="text-cyan-400">💡</span>
                    <span>{station.note}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center pt-6 pb-2 border-t border-slate-800/60 text-xs text-slate-500 space-y-1">
          <p>© 2026 Lampang Flood Watch Project • ระบบติดตามและจำลองสถานการณ์น้ำ</p>
          <p className="text-[11px] text-slate-600">ออกแบบสำหรับรองรับการแสดงผลบนคอมพิวเตอร์และสมาร์ตโฟน</p>
        </footer>
      </div>
    </main>
  );
}