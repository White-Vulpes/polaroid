const getDeviceDetails = async () => {
  const browserDetails = {
    appName: navigator.appName,
    appVersion: navigator.appVersion,
    platform: navigator.platform,
    userAgent: navigator.userAgent,
    language: navigator.language,
    online: navigator.onLine,
  };

  const screenDetails = {
    width: window.screen.width,
    height: window.screen.height,
    colorDepth: window.screen.colorDepth,
    pixelDepth: window.screen.pixelDepth,
  };

  const isMobile = /android|iphone|ipad|iPod/i.test(
    (navigator.userAgent || navigator.vendor || window.opera).toLowerCase()
  );

  let networkDetails = null;
  const connection =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection;
  if (connection) {
    networkDetails = {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt,
      saveData: connection.saveData,
    };
  }

  const battery = await navigator.getBattery();
  const batteryDetails = {
    level: battery.level * 100 + "%",
    charging: battery.charging,
    chargingTime: battery.chargingTime,
    dischargingTime: battery.dischargingTime,
  };

  const deviceDetails = {
    browserDetails,
    screenDetails,
    isMobile,
    networkDetails,
    batteryDetails,
  };

  return deviceDetails;
};

export default async function eventLog(
  location,
  event_id,
  event,
  count = 1,
  data = {}
) {
  const query = `mutation MyMutation($location: jsonb, $website_id: uuid, $event_id: String, $event: String, $device: jsonb, $data: String, $count: Int) {
  insert_events(objects: {website_id: $website_id, location: $location, event_id: $event_id, event: $event, device: $device, data: $data, count: $count}) {
    affected_rows
    }
  }`;

  fetch(`https://white-vulpes.hasura.app/v1/graphql`, {
    method: "POST",
    headers: {
      "x-hasura-role": "client",
      "X-Hasura-Website-Id": "267b46d5-d330-478b-9a51-89af8bfb7528",
    },
    body: JSON.stringify({
      query: query,
      variables: {
        location: location,
        website_id: "267b46d5-d330-478b-9a51-89af8bfb7528",
        event: event,
        event_id: event_id,
        device: await getDeviceDetails(),
        data: JSON.stringify(data),
        count: count,
      },
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log("logged");
    });
}
