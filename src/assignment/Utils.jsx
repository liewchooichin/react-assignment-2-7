/**Utils */

export function simpleId(){
  const id = Math.random().toString(36).substring(2, 9);
  return id;
}