import Papa from "papaparse";

export default function CSVUpload({ setQuestions }) {
  const handleFile = (e) => {
    const file = e.target.files[0];

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const formatted = results.data.map((row, index) => ({
          id: index,
          question: row["Question"],
          options: [
            row["Option A"],
            row["Option B"],
            row["Option C"],
            row["Option D"]
          ],
          answer: ["A", "B", "C", "D"].indexOf(row["Correct Answer"]),
          topic: row["Topic"] || "General"
        }));

        setQuestions(formatted);
      }
    });
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFile} />
    </div>
  );
}