import product_ex from 'images/product_ex.svg';
export const media = [product_ex, product_ex, product_ex, product_ex, product_ex];
export const mediaByIndex = index => media[index % media.length];
