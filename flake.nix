{
    description = "A very basic flake";

    inputs = {
        nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    };
    
    outputs = { self, nixpkgs }: let
        inherit (nixpkgs) lib;
        forAllSystems = lib.genAttrs lib.systems.flakeExposed;
    in {
        devShells = forAllSystems (system:
            let pkgs = nixpkgs.legacyPackages.${system}; in rec {
                default = pkgs.mkShell {
                    packages = with pkgs; [
                        nodejs
                        cargo-watch
                        libiconv
                        darwin.apple_sdk.frameworks.SystemConfiguration
                    ];
                    shellHook = "exec $SHELL";
                };
        });
    };
}
