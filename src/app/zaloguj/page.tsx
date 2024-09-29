import { Button } from "@/components/ui/button";

export default function pageZaloguj() {
  return (
    <div id="alles" className="">
      <div>
        <h1>zaloguj sie</h1>
        <div id="loginElement">
          <label>login</label>
          <input />
        </div>
        <div id="hasloElement">
          <label>haslo</label>
          <input />
        </div>
        <Button variant="default">zaloguj</Button>
      </div>
    </div>
  );
}
