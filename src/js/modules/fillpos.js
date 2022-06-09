function fillPos(item, dataArr) { 
    const formPosBody = document.querySelector('.form-card__pos');
    
    item.forEach((inp, i) => {
        const label = document.createElement('label');
        const div = document.createElement('div');
        inp.id = `${dataArr[i].id}`;
        inp.placeholder = `${dataArr[i].name}`;
  
        label.setAttribute('for', inp.id);
        label.textContent = inp.placeholder;
        inp.after(label);

        div.classList.add('form_card__item');
        div.style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;
        `;

        div.append(inp);
        div.append(label);
        formPosBody.append(div);
    });
}

export default fillPos;
