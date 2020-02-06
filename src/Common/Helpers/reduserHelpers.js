export const updateObjectInArray = (
  items,
  itemId,
  objPropName,
  newObjProps
) => { // - returns new array
  return  items.map(user => {
    if (user[objPropName] === itemId) {
      return { ...user, ...newObjProps}
    } 
    return user;
  });
};
