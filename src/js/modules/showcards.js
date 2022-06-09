function showCards(users) {
    const cardsBody = document.querySelector('.cards__body');

    // cardsBody.innerHTML = '';

    users.sort((a, b) => {
        return a.id + b.id;
    });

    users.forEach(user => {
        const elem = document.createElement('div');
        elem.classList.add('item-card');
       
        elem.innerHTML += `
            <div class="item-card__img">
                <img src="${user.photo}" alt="">
            </div>
            <div class="item-card__name">${user.name}</div>
            <div class="item-card__pos">${user.position}</div>
            <a class="item-card__mail">${user.email}</a>
            <a class="item-card__phone">${user.phone}</a>
        `;

        cardsBody.append(elem);
      
    });

}

export default showCards;
