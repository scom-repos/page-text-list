export const merge = (...objects: any[]) => {
  return objects.reduce((prev, obj) => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof prev[key] === 'object') prev[key] = merge(prev[key], obj[key]);
        else prev[key] = obj[key];
      }
    }
    return prev;
  }, {});
}