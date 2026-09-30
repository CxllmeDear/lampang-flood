import { NextResponse } from "next/server";

export async function GET() {
  // ข้อมูลชุดนี้สามารถเขียนคำสั่ง fetch() ดึงจาก Open Data หรือ API ภายนอกมาคำนวณต่อได้
  const responseData = {
    updatedAt: "30 ก.ย. 2026 20:00 น.",
    overallAlert: {
      level: "warning", // normal, warning, danger
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

  return NextResponse.json(responseData);
}