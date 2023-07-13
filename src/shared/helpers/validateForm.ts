
export function validateForm(variables: any[]): string {
  for(let variable of variables) {
    if (variable === '') {
      throw new Error('Все поля должны быть заполненными')
    }
  }
  return ''
}