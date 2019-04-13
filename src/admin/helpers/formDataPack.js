// упаковка работы
export const packWorkToFormData = work => {
    // создадим объект FormData
    const formData = new FormData();

    // упакуем work
    formData.append('title', work.title);
    formData.append('techs', work.techs);
    formData.append('link', work.link);
    formData.append('photo', work.photo);
    formData.append('description', work.description);

    return formData;
}

// упаковка отзыва
export const packReviewToFormData = review => {
    // создадим объект FormData
    const formData = new FormData();
    // упакуем review
    formData.append('text', review.text);
    formData.append('occ', review.occ);
    formData.append('author', review.author);
    formData.append('photo', review.photo);

    return formData;
}