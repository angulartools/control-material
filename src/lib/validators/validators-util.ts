import { Injectable } from "@angular/core";

@Injectable()
export abstract class ValidatorsUtil {

    static isCPFValido(value): boolean {
        let strCPF = value;
    
        if (strCPF === undefined || strCPF === '' || strCPF === null) {
          return true;
        }
    
        // Retira todos os pontos (.) e o hifem (-).
        strCPF = strCPF.replace(/\./g, '').replace('-', '');
    
        // Verifica se digitou repetido todos os numeros
        if (strCPF === '00000000000') {
          return false;
        }
    
        // Logica para verificar se o CPF e validado
        let soma = 0;
        let resto;
    
        for (let i = 1; i <= 9; i++) {
          soma = soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        }
        resto = (soma * 10) % 11;
    
        if ((resto === 10) || (resto === 11)) {
          resto = 0;
        }
        if (resto !== parseInt(strCPF.substring(9, 10))) {
          return false;
        }
    
        soma = 0;
        for (let i = 1; i <= 10; i++) {
          soma = soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        }
        resto = (soma * 10) % 11;
    
        if ((resto === 10) || (resto === 11)) {
          resto = 0;
        }
    
        if (resto !== parseInt(strCPF.substring(10, 11))) {
          return false;
        }
    
        return true;
      }
    
      static isCNPJValido(cnpj: string): boolean {
    
        if (!cnpj) {
          return false;
        }
    
        // Aceita receber o valor como string, número ou array com todos os dígitos
        const validTypes = typeof cnpj === 'string' || Number.isInteger(cnpj) || Array.isArray(cnpj);
    
        // Elimina valor em formato inválido
        if (!validTypes) {
          return false;
        }
    
        // Guarda um array com todos os dígitos do valor
        const match = cnpj.toString().match(/\d/g);
        const numbers = Array.isArray(match) ? match.map(Number) : [];
    
        // Valida a quantidade de dígitos
        if (numbers.length !== 14) {
          return false;
        }
    
        // Elimina inválidos com todos os dígitos iguais
        const items = Array.from(new Set(numbers));
        if (items.length === 1) {
          return false;
        }
    
        // Cálculo validador
        const calc = (x) => {
          const slice = numbers.slice(0, x);
          let factor = x - 7;
          let sum = 0;
    
          for (let i = x; i >= 1; i--) {
            const n = slice[x - i];
            sum += n * factor--;
            if (factor < 2) {
              factor = 9;
            }
          }
    
          const result = 11 - (sum % 11);
    
          return result > 9 ? 0 : result;
        };
    
        // Separa os 2 últimos dígitos de verificadores
        const digits = numbers.slice(12);
    
        // Valida 1o. dígito verificador
        const digit0 = calc(12);
        if (digit0 !== digits[0]) {
          return false;
        }
    
        // Valida 2o. dígito verificador
        const digit1 = calc(13);
        return digit1 === digits[1];
    
      }
}