export default function Power() {
  const droplets = {
    LyadhCraft: 342253375,
    CreateCraft: 342266580,
    TestCraft: 344100833,
  };
  const API_TOKEN =
    'Bearer dop_v1_8770c61f99aa312934f8a6518a6e26507481ead6b1f822fe5cc214310279a37e';

  // async function getGenericAPIResponse(baseURL, headers, method = 'GET') {
  //   const response = await fetch(baseURL, {
  //     method,
  //     headers,
  //   });
  //   const apiResponse = await response.json();
  //   return apiResponse;
  // }

  // async function fetchDropletStatus(
  //   token: string,
  //   dropletID: number
  // ): Promise<void> {
  //   const statusCheckHeaders = {
  //     'Content-Type': 'application/json',
  //     Authorization: token,
  //   };

  //   const baseURL = `https://api.digitalocean.com/v2/droplets/${dropletID}`;

  //   const dropletResp = await getGenericAPIResponse(
  //     baseURL,
  //     statusCheckHeaders
  //   );
  //   return dropletResp.droplet.status;
  // }

  async function sendCommand(
    token: string,
    command: string,
    dropletID: number
  ): Promise<void> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: token,
    };
    const body = {
      type: command,
    };

    const baseURL = `https://api.digitalocean.com/v2/droplets/${dropletID}/actions`;

    await fetch(baseURL, {
      headers,
      method: 'POST',
      body: JSON.stringify(body),
    });

    // const jsonResponse = await apiResponse.json();
  }

  return (
    <div className="page-common">
      {/* <button
        className="power-on-button"
        type="button"
        onClick={() => {
          fetchDropletStatus(API_TOKEN, droplets.LyadhCraft);
        }}
      >
        Refresh
      </button> */}
      <div>
        <span className="server-name">LyadhCraft</span>
        <button
          className="power-on-button"
          type="button"
          onClick={() => {
            sendCommand(API_TOKEN, 'power_on', droplets.LyadhCraft);
          }}
        >
          PowerOn
        </button>
      </div>
      <div>
        <span className="server-name">CreateCraft</span>
        <button
          className="power-on-button"
          type="button"
          onClick={() => {
            sendCommand(API_TOKEN, 'power_on', droplets.CreateCraft);
          }}
        >
          PowerOn
        </button>
      </div>
    </div>
  );
}
