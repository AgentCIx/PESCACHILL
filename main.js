const { autoUpdater } = require('electron-updater');
const log = require('electron-log');

// Configurar logging (opcional, para depuración)
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

// Eventos del autoUpdater
autoUpdater.on('checking-for-update', () => {
  log.info('Checking for update...');
});

autoUpdater.on('update-available', (info) => {
  log.info('Update available.', info);
});

autoUpdater.on('update-not-available', (info) => {
  log.info('Update not available.', info);
});

autoUpdater.on('error', (err) => {
  log.error('Error in auto-updater. ' + err);
});

autoUpdater.on('download-progress', (progressObj) => {
  let logMessage = 'Download speed: ' + progressObj.bytesPerSecond;
  logMessage += ' - Downloaded ' + progressObj.percent + '%';
  logMessage += ' (' + progressObj.transferred + '/' + progressObj.total + ')';
  log.info(logMessage);
});

autoUpdater.on('update-downloaded', (info) => {
  log.info('Update downloaded. Will quit and install in 5 seconds.');
  // Puedes mostrar un diálogo al usuario si quieres, pero aquí lo haremos automático
  setTimeout(() => {
    autoUpdater.quitAndInstall();
  }, 5000);
});

// Verificar actualizaciones después de 3 segundos y luego cada hora
setTimeout(() => {
  autoUpdater.checkForUpdatesAndNotify();
}, 3000);
setInterval(() => {
  autoUpdater.checkForUpdatesAndNotify();
}, 60 * 60 * 1000); // cada hora