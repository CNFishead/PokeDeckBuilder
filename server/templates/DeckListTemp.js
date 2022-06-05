module.exports = (deck, logo) => `<!DOCTYPE html>
  <html>
  <head>
    <title>${deck.deck_name} Deck List</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  </head>
  <body>
    <div class="container">
      <div class="row mx-auto" style="padding: 5%; text-align: center;">
          <img src="${logo}" style="width: 300px; margin: 0 auto;" />
      </div>
      <div class="row mx-auto" style="padding: 5%;">
        <div class="col col-lg-6 col-md-6" style="width: 40%; display: inline-block;">
          <img src="${deck.image}" style="width: 100%;" />
        </div>
        <div class="col col-lg-6 col-md-6" style="width: 55%; display: inline-block; padding: 5% 5%;">
          <h1>${deck.deck_name} Deck List</h1>
          <h3>${deck.type}</h3>
          <h3>${deck.cards.length} cards</h3>
        </div>
      </div>
      <div class="row mx-auto">
          ${deck.cards.map(
            (card) =>
              `
            <div class="card col col-md-2 p-2 " style="width: 15.4%; display: inline-block;">
              <div class="card-img">
                <img src="${card.imageUrl}" alt="${card.name}" style="width: 100%;" />
              </div>
            </div>`
          )}
    </div>
  </body>
</html>`;
