import useLocalStorage from "../hooks/use-local-storage";

interface GameHistoryEntry {
	date: string;
	difficulty: number;
	timeTaken: number;
}

function History() {
	const { load } = useLocalStorage();
	const history: GameHistoryEntry[] = load("gameHistory") || [];

	return (
		<div className="mt-4">
			<h2 className="text-xl font-bold mb-2 text-gray-800">Past Games</h2>
			{history.length === 0 ? (
				<p className="text-gray-500">No games played yet.</p>
			) : (
				<ul className="space-y-1">
					{history.map((entry, index) => (
						<li key={`${entry.date}-${index}`} className="text-gray-700">
							{new Date(entry.date).toLocaleString()} - Difficulty:{" "}
							{entry.difficulty} - Time: {entry.timeTaken}s
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default History;
