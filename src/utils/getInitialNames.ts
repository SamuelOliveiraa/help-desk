export function getInitialNames(nome: string): string {
	if (!nome) return "";

	const partes = nome.trim().split(/\s+/).filter(Boolean);
	if (partes.length === 0) return "";

	const primeira = partes[0].charAt(0).toUpperCase();
	const ultima =
		partes.length > 1
			? partes[partes.length - 1].charAt(0).toUpperCase()
			: partes[0].charAt(1)?.toUpperCase() || "";

	return primeira + ultima;
}
