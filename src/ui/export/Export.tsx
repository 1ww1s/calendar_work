import { FC } from 'react';
import { MyButton } from '../button';

export const ExportComponent: FC = () => {

  const exportToTxt = () => {
    const calendar_work = JSON.parse(localStorage.getItem('calendar_work') || 'null')
    const list = JSON.parse(localStorage.getItem('list') || 'null')
    // Преобразуем JSON в красивый текстовый формат
    const textData = JSON.stringify({calendar_work, list}, null, 2);
    
    // Создаем Blob
    const blob = new Blob([textData], { type: 'text/plain' });
    
    // Создаем URL для Blob
    const url = URL.createObjectURL(blob);
    
    // Создаем временную ссылку для скачивания
    const link = document.createElement('a');
    link.href = url;
    link.download = `data_${new Date().getTime()}.txt`;
    
    // Кликаем по ссылке для скачивания
    document.body.appendChild(link);
    link.click();
    
    // Очищаем
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <MyButton onClick={exportToTxt}>
      Скачать данные в TXT
    </MyButton>
  );
}