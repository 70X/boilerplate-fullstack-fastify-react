describe('Simple Addition Test', () => {
  it('should add two numbers correctly', () => {
    expect(1 + 2).toBe(3);
  });
  it('should fail', () => {
    expect(1 + 2).toBe(4);
  });
});
