
Se busca desarollador UI Para proyecto. 
* 9am-5pm remoto.

Para aplicar enviar CV con portafolio y un estimado de costo y tiempo basado en los requimientos siguientes al correo carlos@futureplanetformonkeys.com

Este proyecto consiste en el desarrollo de una aplicación web orientada a la gestión de pagos y transacciones financieras utilizando criptomonedas. La plataforma permite a los usuarios pagar servicios, realizar retiros de efectivo y gestionar diversas billeteras digitales, todo en un entorno seguro y accesible. Cada usuario puede vincular múltiples cuentas de servicios (como electricidad, telecomunicaciones, etc.) y realizar pagos directamente utilizando criptomonedas como Bitcoin (BTC), Ethereum (ETH), entre otras. Además, la plataforma facilita el retiro de efectivo en puntos de servicio autorizados, como OXXO, utilizando criptoactivos.

Post:
https://gist.github.com/carlosalaniz/5e7671a2cecdcb105fc2f385cc9d5393

**Configuración General**
   - **Pila Tecnológica:**
     - **Frontend:** Vue.js + typescript con Composition API
     - **Estilos:** picoCSS
     - **Integración con Backend:** Archivo `api.ts` para llamadas a la API

### Pantallas de la Aplicación
1. **Pantalla de Inicio de Sesión y Registro**
   - **Pantalla de Inicio de Sesión:** Formulario para ingresar con correo electrónico y contraseña.
   - **Pantalla de Registro:** Formulario para registrar un nuevo usuario con correo electrónico, contraseña y confirmación de contraseña.

2. **Dashboard (Tablero de Control)**
   - **Inicio del Dashboard:** Resumen de balances de las billeteras y accesos rápidos para realizar pagos o retiros.
   - **Widget de Pagos de Servicios:** 
       - Formulario para seleccionar el tipo de cuenta, número de cuenta, monto fiat, y token.
       - Detalles de pagos iniciados incluyendo el estado y detalles de la transacción.
   - **Widget de Retiro de Efectivo:** 
       - Formulario para seleccionar servicio de retiro, detalles del destinatario, monto fiat, y token.
       - Detalles de retiros iniciados incluyendo el estado y detalles de la transacción.

3. **Gestión de Perfil**
   - **Pantalla de Perfil del Usuario:** Opciones para agregar o eliminar cuentas de servicio.
       - **Formulario para Añadir Cuenta:** Ingresar tipo de cuenta, apodo y número.
       - **Listado de Cuentas con Opción de Eliminación:** Muestra las cuentas existentes con la opción de eliminar.

4. **Pantallas de Transacciones (Modales)**
   - **Modal de Depósito:** Formulario para realizar depósitos en una billetera específica.
   - **Modal de Retiro:** Formulario para realizar retiros/transfers desde una billetera específica.
   - **Modal de Pago:** Formulario para realizar un pago desde una cuenta específica, similar a la funcionalidad en el dashboard pero accesible de forma individual por cuenta.



