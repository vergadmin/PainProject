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
            vh : sessionStorage.getItem("vh"),
          }
        )
      });
      const data = await response;
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

const appendVHInteractions = () => {
  if(sessionStorage.getItem('vhInteractionCount') === null && sessionStorage.length >= 1 ){
    sessionStorage.setItem('vhInteractionCount', 1);

    if(sessionStorage.getItem('vh') === 'jt'){
      sessionStorage.setItem('vh', 'rm');
    }
    else{
      sessionStorage.setItem('vh', 'jt');
    }

    sessionStorage.removeItem("interventionStartTime");
    LogUserInputToDB();
  }
  else{
    var vhInteractionCount = sessionStorage.getItem('vhInteractionCount');
    sessionStorage.setItem('vhInteractionCount', parseInt(vhInteractionCount) + 1);
    sessionStorage.clear();
    window.location.href = 'https://www.example.com';
  }
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
          vh : sessionStorage.getItem("vh"),
        }
      )
    });
    const data = await response;
    console.log(data);
    // sessionStorage.clear();
    appendVHInteractions();
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function LogUserInputToDB(){
  try {
    const response = await fetch(`${baseAPIURL}/pain/logParticipantVisit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {participantID : sessionStorage.getItem("participantID"), 
          visitID : sessionStorage.getItem("visitID"),
          vh : sessionStorage.getItem("vh"),
          loginTime : sessionStorage.getItem("loginTime"),
          userPrompt: sessionStorage.getItem("userPrompt")
      })
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}