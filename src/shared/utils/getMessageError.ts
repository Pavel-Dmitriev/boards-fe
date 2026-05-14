/** Получение сообщения об ошибке.
 * @param {unknown} error объект с ошибкой.
 *
 * @returns сообщение об ошибке с правильным типом.
 */
function getMessageError(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

export default getMessageError;
