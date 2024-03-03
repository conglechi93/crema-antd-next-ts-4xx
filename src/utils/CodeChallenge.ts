import pkceChallenge from 'pkce-challenge';

function createChallenge() {
  const challenge = pkceChallenge(128);
  return challenge;
}

export {createChallenge};
