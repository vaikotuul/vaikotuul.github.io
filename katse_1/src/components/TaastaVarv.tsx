import { useEffect } from 'react';

function ResetColors() {
  useEffect(() => {
    console.log('Resetting colors to default'); // Kontrolli, kas see käivitub
    document.documentElement.style.setProperty(
      '--control-panel-background-color',
      'var(--default-control-panel-background-color)'
    );
    document.documentElement.style.setProperty(
      '--control-panel-color',
      'var(--default-control-panel-color)'
    );
    document.documentElement.style.setProperty(
      '--control-button-background-color',
      'var(--default-button-background-color)'
    );
    document.documentElement.style.setProperty(
      '--control-button-color',
      'var(--default-button-color)'
    );
    document.documentElement.style.setProperty(
      '--header-background-color',
      'var(--default-header-background-color)'
    );
    document.documentElement.style.setProperty(
      '--header-color',
      'var(--default-header-color)'
    );
  }, []);

  return null;
}

export default ResetColors;