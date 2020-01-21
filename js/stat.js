'use strict';

const BLOCK_HEIGHT = 270;
const BLOCK_WIDTH = 420;
const BLOCK_X = 100;
const BLOCK_Y = 10;
const BLOCK_COLOR = '#fff';

const SHADOW_GAP = 10;
const SHADOW_COLOR = 'rgba(0,0,0,0.7)';

const COLUMN_GAP = 50;
const COLUMN_WIDTH = 40;
const MAX_COLUMN_HEIGHT = 150;

const FONT = '16px PT Mono';
const FONT_GAP = 30;
const FONT_COLOR = '#000';

var renderBlock = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, BLOCK_WIDTH, BLOCK_HEIGHT);
};

var getMaxElement = function (times) {
  var maxElement = times[0];
  for (var i = 0; i < times.length; i++) {
    if (times[i] > maxElement) {
      maxElement = times[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  const maxTime = getMaxElement(times);

  renderBlock(ctx, BLOCK_X + SHADOW_GAP, BLOCK_Y + SHADOW_GAP, SHADOW_COLOR);
  renderBlock(ctx, 100, 10, BLOCK_COLOR);

  ctx.font = FONT;
  ctx.fillStyle = FONT_COLOR;
  ctx.fillText('Ура, вы победили! \n', 100 + COLUMN_GAP, BLOCK_Y + FONT_GAP);
  ctx.fillText('Список результатов', 100 + COLUMN_GAP, BLOCK_Y + (SHADOW_GAP * 2) + FONT_GAP);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], 100 + COLUMN_GAP + (COLUMN_GAP + COLUMN_WIDTH) * i, 270);
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      ctx.fillRect(100 + COLUMN_GAP + (COLUMN_GAP + COLUMN_WIDTH) * i, 250, COLUMN_WIDTH, (-1) * (MAX_COLUMN_HEIGHT * Math.floor(times[i])) / maxTime);
    } else {
      ctx.fillStyle = 'hsl(233,' + Math.floor(Math.random() * 100) + '%, 46%)';
      ctx.fillRect(100 + COLUMN_GAP + (COLUMN_GAP + COLUMN_WIDTH) * i, 250, COLUMN_WIDTH, (-1) * (MAX_COLUMN_HEIGHT * Math.floor(times[i])) / maxTime);
    }
    ctx.fillStyle = '#000';
    ctx.fillText(Math.floor(times[i]).toString(), 100 + COLUMN_GAP + (COLUMN_GAP + COLUMN_WIDTH) * i, BLOCK_HEIGHT - (MAX_COLUMN_HEIGHT * Math.floor(times[i])) / maxTime - FONT_GAP);
  }
};
