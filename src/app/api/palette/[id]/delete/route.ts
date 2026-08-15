import { db } from "@/libs/db";

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await db.$transaction(async (tx) => {
    // 削除するPalette取得
    const palette = await tx.palette.findUnique({
      where: {
        id,
      },
      select: {
        placeId: true,
      },
    });

    if (!palette) {
      throw new Error("Palette not found");
    }

    // Palette削除
    await tx.palette.delete({
      where: {
        id,
      },
    });

    // 残っているPalette数確認
    const count = await tx.palette.count({
      where: {
        placeId: palette.placeId,
      },
    });

    // 0件ならPlace削除
    if (count === 0) {
      await tx.place.delete({
        where: {
          id: palette.placeId,
        },
      });
    }
  });

  return Response.json({ success: true });
}