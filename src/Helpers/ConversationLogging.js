
export async function LogMessagesToDB(inputConversation){
    try {
      const response = await fetch('/pain/updateParticipantMessages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {participantID : sessionStorage.getItem("participantID"), 
            visitID : sessionStorage.getItem("visitID"),
            conversationLog : inputConversation,
          }
        )
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }