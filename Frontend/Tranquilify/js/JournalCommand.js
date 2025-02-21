// Command for adding a journal entry.
export class AddEntryCommand {
  constructor(newEntry, entries, setEntries, setNewEntry) {
    this.newEntry = newEntry;
    this.entries = entries;
    this.setEntries = setEntries;
    this.setNewEntry = setNewEntry;
  }
  execute() {
    if (this.newEntry.trim()) {
      // Use Date.now() as the id.
      const timestamp = Date.now();
      const entry = {
        id: timestamp.toString(),
        text: this.newEntry.trim(),
      };
      this.setEntries([entry, ...this.entries]);
      this.setNewEntry('');
    }
  }
}

// Command for deleting a journal entry.
export class DeleteEntryCommand {
  constructor(id, entries, setEntries) {
    this.id = id;
    this.entries = entries;
    this.setEntries = setEntries;
  }
  execute() {
    this.setEntries(this.entries.filter((entry) => entry.id !== this.id));
  }
}

// Command for saving an edited journal entry.
export class SaveEditCommand {
  constructor(editingText, editingEntryId, entries, setEntries, cancelEditing) {
    this.editingText = editingText;
    this.editingEntryId = editingEntryId;
    this.entries = entries;
    this.setEntries = setEntries;
    this.cancelEditing = cancelEditing;
  }
  execute() {
    if (this.editingText.trim()) {
      const updatedEntries = this.entries.map((entry) => {
        if (entry.id === this.editingEntryId) {
          return { ...entry, text: this.editingText.trim() };
        }
        return entry;
      });
      this.setEntries(updatedEntries);
      this.cancelEditing();
    }
  }
}

// Command for canceling the editing process.
export class CancelEditCommand {
  constructor(cancelEditing) {
    this.cancelEditing = cancelEditing;
  }
  execute() {
    this.cancelEditing();
  }
}
