async function authenticateBiometric() {
  if (window.PublicKeyCredential) {
    try {
      const credentials = await navigator.credentials.get({
        publicKey: {
          challenge: new Uint8Array(32),
          allowCredentials: [],
          timeout: 60000,
          userVerification: 'required'
        }
      });
      console.log('Biometric Authentication Successful:', credentials);
      alert('Biometric login successful!');
    } catch (err) {
      console.error('Biometric Authentication Failed:', err);
      alert('Biometric authentication failed.');
    }
  } else {
    alert('Your browser does not support biometric authentication.');
  }
}