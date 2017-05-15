$(document).ready(() => {
  const cards = $(".card.previous");
  cards.each((idx, card) => {
    const $card = $(card);
    $card.addClass(`previous${idx}`);
  });
});
