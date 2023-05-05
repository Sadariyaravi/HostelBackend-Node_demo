const registration_temp = (username) => {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <style>
        * {
          font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
            "Lucida Sans", Arial, sans-serif;
        }
        .container {
          width: 1000px;
          height: 670px;
        }
      </style>
    </head>
    <body style="display: flex; justify-content: center">
      <div class="container" style="border: 4px solid black">
        <table style="width: 995px">
          <tr>
            <td colspan="2" style="display: flex; justify-content: center">
              <img src="https://www.pushengage.com/wp-content/uploads/2022/02/Best-Website-Welcome-Message-Examples.png" style="width: 995px; height: 400px" />
            </td>
          </tr>
  
          <tr>
            <td colspan="2" style="display: flex; justify-content: left">
              <h1 style="color: blue">Welcome ${username},</h1>
            </td>
          </tr>
  
          <tr>
            <td colspan="2" style="display: flex; justify-content: left">
              <h3>
                you are registered successfully in
                <span
                  style="
                    text-decoration: underline dashed blueviolet 2px;
                    text-underline-offset: 5px;
                  "
                  >Hostel management system</span
                >
                now please login.
              </h3>
            </td>
          </tr>
  
          <tr>
            <td colspan="2">
              <p>Thanks & Regards,</p>
              <strong>Hostel Admin</strong>
            </td>
          </tr>
  
          <tr style="background-color: black; color: white; text-align: center">
            <td style="padding-top: 10px; padding-bottom: 10px">
              Copyrights © 2023 Hostel Management Syastem. All rights reserved.
            </td>
          </tr>
        </table>
      </div>
    </body>
  </html>
  `;
};

module.exports = registration_temp;
