// DownloadParticipantData.js
import { useEffect } from 'react';
import { baseAPIURL } from '../Helpers/ConversationLogging';

function DownloadParticipantData() {
    useEffect(() => {
      // Use fetch to request the file from the backend
      fetch(`${baseAPIURL}/pain/downloadParticipantData`)
        .then(response => {
          if (response.ok) {
            return response.blob();
          } else {
            throw new Error('Failed to download file');
          }
        })
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'ParticipantVisits.xlsx'; // Change the file name as needed
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
        })
        .catch(error => {
          console.error('Error downloading file:', error);
        });
    }, []);
  
    return null; // This component doesn't need to render anything
  }

export default DownloadParticipantData;