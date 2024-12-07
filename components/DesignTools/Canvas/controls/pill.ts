export const horizontalPillRender = (
  ctx,
  left,
  top,
  styleOverride,
  fabricObject,
  width,
  height
) => {
  const radius = height / 2; // Radius for pill shape
  ctx.save();
  ctx.translate(left, top);
  ctx.rotate((fabricObject.angle * Math.PI) / 180);
  ctx.translate(-left, -top);
  ctx.shadowColor = "rgba(0,0,0,0.3)";
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.fillStyle = "white";
  ctx.strokeStyle = "#209de0";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(left - height / 2, top - width / 2 + radius);
  ctx.lineTo(left - height / 2, top + width / 2 - radius);
  ctx.quadraticCurveTo(
    left - height / 2,
    top + width / 2,
    left - height / 2 + radius,
    top + width / 2
  );
  ctx.lineTo(left + height / 2 - radius, top + width / 2);
  ctx.quadraticCurveTo(
    left + height / 2,
    top + width / 2,
    left + height / 2,
    top + width / 2 - radius
  );
  ctx.lineTo(left + height / 2, top - width / 2 + radius);
  ctx.quadraticCurveTo(
    left + height / 2,
    top - width / 2,
    left + height / 2 - radius,
    top - width / 2
  );
  ctx.lineTo(left - height / 2 + radius, top - width / 2);
  ctx.quadraticCurveTo(
    left - height / 2,
    top - width / 2,
    left - height / 2,
    top - width / 2 + radius
  );
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
};

export const pillRender = (
  ctx,
  left,
  top,
  styleOverride,
  fabricObject,
  width,
  height
) => {
  const radius = height / 2;
  ctx.save();
  ctx.translate(left, top);
  ctx.rotate((fabricObject.angle * Math.PI) / 180);
  ctx.translate(-left, -top);
  ctx.shadowColor = "rgba(0,0,0,0.3)";
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.fillStyle = "white";
  ctx.strokeStyle = "#209de0";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(left - width / 2 + radius, top - height / 2);
  ctx.lineTo(left + width / 2 - radius, top - height / 2);
  ctx.quadraticCurveTo(
    left + width / 2,
    top - height / 2,
    left + width / 2,
    top - height / 2 + radius
  );
  ctx.lineTo(left + width / 2, top + height / 2 - radius);
  ctx.quadraticCurveTo(
    left + width / 2,
    top + height / 2,
    left + width / 2 - radius,
    top + height / 2
  );
  ctx.lineTo(left - width / 2 + radius, top + height / 2);
  ctx.quadraticCurveTo(
    left - width / 2,
    top + height / 2,
    left - width / 2,
    top + height / 2 - radius
  );
  ctx.lineTo(left - width / 2, top - height / 2 + radius);
  ctx.quadraticCurveTo(
    left - width / 2,
    top - height / 2,
    left - width / 2 + radius,
    top - height / 2
  );
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
};
