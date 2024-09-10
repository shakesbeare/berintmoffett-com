{
    description = "A very basic flake";

    inputs = {
        nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    };
    
    outputs = { self, nixpkgs }: let
        lpkgs = nixpkgs.legacyPackages.x86_64-linux;
        mpkgs = nixpkgs.legacyPackages.aarch64-darwin;
    in {
      devShells.x86_64-linux.default = lpkgs.mkShell {
          packages = with lpkgs; [
            nodejs
            cargo-watch
            libiconv
              openssl
              pkg-config
              libsoup
              webkitgtk
              llvmPackages.bintools
          ];
          shellHook = "exec $SHELL";
      };

      devShells.aarch64-darwin-linux.default = mpkgs.mkShell {
          packages = with mpkgs; [
            nodejs
            cargo-watch
            libiconv
            darwin.apple_sdk.frameworks.SystemConfiguration 
          ];
          shellHook = "exec $SHELL";
      };
    };
}
