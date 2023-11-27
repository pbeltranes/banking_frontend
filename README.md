#README

## Comandos

### Instalar dependencias
```bash
npm run i
```

### Correr la aplicación
```bash
npm run dev
```

## SUPUESTOS

> La aplicacion ejecuta montos indistinto del tipo de divisa, no se realiza conversiones solo transformacion al tipo de divisa.
> Se guarda en coockies el account_id, si no existe account_id en cookies redireccionara a creación de cuenta.

### Validaciones creacion cuenta
- El nombre debe contener 3 a 30 caracteres alfabeticos.
- El número de cuenta debe ser un digito de 10 a 15 digitos.
- El balance inicial puede ser una cifra de 20 digitos.

### Validaciones ingreso transacción
- Se valida que el usuario tenga dinero para poder realizar un egreso de dinero.
- Se puede transferir hasta 100.0000.000.0 en cualquier divisa.
