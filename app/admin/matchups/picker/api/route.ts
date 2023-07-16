import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentWeekDates } from "@/lib/dateTime.ts/dateFormatter";
import moment from "moment";

// TODO - add admin auth check
export async function GET() {
  try {
    const now = moment().format("YYYYMMDD");
    const weekDates = getCurrentWeekDates(now);

    // TODO update types
    const matchups = await prisma.potentialMatchup.findMany({
      where: {
        gameDate: {
          in: Object.values(weekDates),
        },
      },
    });

    return NextResponse.json({ matchups, weekDates }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { id, adminUseGame } = await request.json();
    // TODO validate input

    // TODO update types
    const updated = await prisma.potentialMatchup.update({
      where: {
        id: id,
      },
      data: {
        adminUseGame: !adminUseGame,
      },
    });

    return NextResponse.json({ updated }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
