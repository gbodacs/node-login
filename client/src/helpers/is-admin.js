export function getIsAdminFromStorage() 
{
  // ez a függvény stringként adja vissza, hogy "true vagy "false"
  return sessionStorage.getItem('isAdmin');
}
