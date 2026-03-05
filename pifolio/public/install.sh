xec ./portfolio
#!/bin/sh
set -e

OS=$(uname -s)
ARCH=$(uname -m)

run_binary() {
  echo "⬇️  Downloading portfolio..."
  curl -fL "$1" -o portfolio
  chmod +x portfolio
  exec ./portfolio
}

unsupported() {
  echo ""
  echo "┌───────────────────────────────┐"
  echo "│        PI PORTFOLIO CLI       │"
  echo "└───────────────────────────────┘"
  echo ""
  echo "⚡ Your system: $OS $ARCH"
  echo "This binary is not built for it (yet)."
  echo ""

  printf "Opening portfolio"
  for i in 1 2 3 4; do
    printf "."
    sleep 0.4
  done
  echo ""
  echo ""

  if command -v open >/dev/null; then
    open https://pidev.tech
  elif command -v xdg-open >/dev/null; then
    xdg-open https://pidev.tech
  else
    echo "Visit: https://pidev.tech"
  fi

  exit 0
}

if [ "$OS" = "Linux" ] && [ "$ARCH" = "x86_64" ]; then
  run_binary "https://github.com/pie-314/pie-portfolio/releases/download/linux-arm64/portfolio-linux-amd64"
elif [ "$OS" = "Darwin" ] && [ "$ARCH" = "arm64" ]; then
  run_binary "https://github.com/pie-314/pie-portfolio/releases/download/mac-arm64/portfolio-macos-arm64"
else
  unsupported
fi
