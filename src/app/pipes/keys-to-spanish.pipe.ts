import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keysToSpanish'
})
export class KeysToSpanishPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): string | undefined {
    
    const mappedKeys = [
      { key: 'userId', value: 'ID' },
      { key: 'name', value: 'Nombre' },
      { key: 'lastName', value: 'Apellido' },
      { key: 'age', value: 'Edad' },
      { key: 'dni', value: 'DNI' },
      { key: 'email', value: 'E-mail' },
      { key: 'password', value: 'Contraseña' },
      { key: 'socialWork', value: 'Obra Social' },
      { key: 'speciality', value: 'Especialidad' },
      { key: 'userRole', value: 'Rol' },
      { key: 'profilePhoto', value: 'Foto1' },
      { key: 'profilePhotoTwo', value: 'Foto2' },
      { key: 'verified', value: 'E-mail Verificado' },
      { key: 'verifiedByAdmin', value: 'Verificado por Admin' }
    ];

    return mappedKeys.find((item) => item.key === value)?.value;
  }

}
