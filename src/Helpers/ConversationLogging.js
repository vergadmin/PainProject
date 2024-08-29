// export const baseAPIURL = "";
export const baseAPIURL = "http://patientportal-api.us-east-1.elasticbeanstalk.com";


export async function LogMessagesToDB(inputConversation){
    try {
      const response = await fetch(`${baseAPIURL}/pain/updateParticipantMessages`, {
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
      const data = await response;
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

const redirect = () => {
  window.location.href = 'https://www.example.com';
};

export async function EndSession(){
  try {
    const response = await fetch(`${baseAPIURL}/pain/endSession`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {participantID : sessionStorage.getItem("participantID"), 
          visitID : sessionStorage.getItem("visitID"),
        }
      )
    });
    const data = await response;
    console.log(data);
    sessionStorage.clear();
    redirect();
  } catch (error) {
    console.error('Error:', error);
  }
}