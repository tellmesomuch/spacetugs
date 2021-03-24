```bash
kubectl create namespace cert-manager
```

```bash
helm repo add jetstack https://charts.jetstack.io
helm repo update
```

```bash
helm install \
  cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --version v1.2.0 \
  --create-namespace \
  --set installCRDs=true
```

## letsencrypt issuer
```bash
kubectl apply -f issuer.yaml
```
