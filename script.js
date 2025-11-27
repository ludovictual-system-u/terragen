document.getElementById("terraformForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const provider = document.getElementById("provider").value;
  const resource = document.getElementById("resource").value;
  const name = document.getElementById("name").value;

  // Envoie les données à l'API GitHub pour déclencher l'Action
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/dispatches`, {
    method: "POST",
    headers: {
      "Authorization": `token ${token}`,
      "Accept": "application/vnd.github.v3+json",
    },
    body: JSON.stringify({
      event_type: "generate_terraform",
      client_payload: {
        provider,
        resource,
        name,
      },
    }),
  });

  if (response.ok) {
    document.getElementById("result").innerHTML = "Code Terraform en cours de génération...";
  } else {
    document.getElementById("result").innerHTML = "Erreur lors de la génération.";
  }
});