$(document).ready(() => {
  const cards = $(".card.previous");
  cards.each((idx, card) => {
    const $card = $(card);
    $card.addClass(`previous${idx}`);
    $card.click((e) => {
      $card.addClass("fold-out");
      window.setTimeout(() => {
        $card.removeClass("fold-out");
        $card.toggleClass("previous-focus");
      }, 500);
    });
  });
});
