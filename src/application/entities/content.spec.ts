import { Content } from "./content"

describe('Notification content', () => {
    
    it('sould be able to create a notifications content', () => {
        const content = new Content('Você recebeu uma nova notifação')
    
        expect(content).toBeTruthy();
    });
    
    it('sould not be able to create a notifications content with less than 5 characteres', () => {
    
        expect(() => new Content('aaa') ).toThrow();
    })
    it('sould not be able to create a notifications content with more than 240 characteres', () => {
    
        expect(() => new Content('a'.repeat(241)) ).toThrow();
    })
})
