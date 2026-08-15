import { db } from "@/libs/db";
import { auth } from "@/libs/auth";
import { toPalettesUI } from "@/utils/transform";


type SearchPalettesParams = {
  placeId?: string;
  date?: string;
  time?: string;
};

export async function searchPalettes({
  placeId,
  date,
  time,
}: SearchPalettesParams) {
  const session = await auth();

  if (!session?.user?.id) {
    return [];
  }

  let captureDate: {
    gte: Date;
    lt: Date;
  } | undefined;

  let hasTime: boolean | undefined;

  if (date && !time) {
    // --------------------------------
    // 場所 + 日付
    // 例：2026-03-31
    // --------------------------------

    const start = new Date(
      `${date}T00:00:00+09:00`
    );

    const end = new Date(
      `${date}T00:00:00+09:00`
    );

    end.setUTCDate(end.getUTCDate() + 1);

    captureDate = {
      gte: start,
      lt: end,
    };
  }

  if (date && time) {
    // --------------------------------
    // 場所 + 日付 + 時間
    // 例：2026-03-31 15:00
    // → 15:00〜15:59:59
    // --------------------------------

    const start = new Date(
      `${date}T${time}:00+09:00`
    );

    const end = new Date(start);
    end.setUTCHours(end.getUTCHours() + 1);

    captureDate = {
      gte: start,
      lt: end,
    };

    // 時間指定の場合は hasTime=true のものだけ
    hasTime = true;
  }

  const palettes = await db.palette.findMany({
    where: {
      userId: session.user.id,

      ...(placeId && {
        placeId,
      }),

      ...(captureDate && {
        captureDate,
      }),

      ...(hasTime !== undefined && {
        hasTime,
      }),
    },

    include: {
      place: true,
    },

    orderBy: {
      captureDate: "desc",
    },
  });

  const palettesUI = toPalettesUI(palettes);
   
   return palettesUI;
}