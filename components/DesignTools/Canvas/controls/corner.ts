export const customRender = (ctx, left, top, styleOverride, fabricObject) => {
  const size = 13;
  const radius = 5;
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.3)";
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.fillStyle = "white";
  ctx.strokeStyle = "#209de0";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(left - size / 2 + radius, top - size / 2);
  ctx.lineTo(left + size / 2 - radius, top - size / 2);
  ctx.quadraticCurveTo(
    left + size / 2,
    top - size / 2,
    left + size / 2,
    top - size / 2 + radius
  );
  ctx.lineTo(left + size / 2, top + size / 2 - radius);
  ctx.quadraticCurveTo(
    left + size / 2,
    top + size / 2,
    left + size / 2 - radius,
    top + size / 2
  );
  ctx.lineTo(left - size / 2 + radius, top + size / 2);
  ctx.quadraticCurveTo(
    left - size / 2,
    top + size / 2,
    left - size / 2,
    top + size / 2 - radius
  );
  ctx.lineTo(left - size / 2, top - size / 2 + radius);
  ctx.quadraticCurveTo(
    left - size / 2,
    top - size / 2,
    left - size / 2 + radius,
    top - size / 2
  );
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
};
