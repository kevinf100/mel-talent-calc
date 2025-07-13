import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target directory for the actual project
const targetDir = path.join(__dirname, 'src', 'core', 'data');

// Icon mappings based on WoW Classic and available icons
const specIconMappings = {
    // DRUID
    'druid/balance': 'spell_nature_starfall.png',
    'druid/feralcombat': 'ability_druid_enrage.png', // closest available
    'druid/restoration': 'spell_nature_healingtouch.png',
    
    // HUNTER  
    'hunter/beastmastery': 'ability_hunter_pet_bear.png',
    'hunter/marksmanship': 'ability_marksmanship.png',
    'hunter/survival': 'ability_hunter_survivalinstincts.png',
    
    // MAGE
    'mage/arcane': 'spell_arcane_arcanepotency.png',
    'mage/fire': 'spell_fire_fireball.png',
    'mage/frost': 'spell_frost_frostbolt02.png',
    
    // PALADIN
    'paladin/holy': 'spell_holy_holybolt.png',
    'paladin/protection': 'spell_holy_devotionaura.png',
    'paladin/retribution': 'spell_holy_auraoflight.png',
    
    // PRIEST
    'priest/discipline': 'spell_holy_powerwordshield.png',
    'priest/holy': 'spell_holy_holybolt.png',
    'priest/shadow': 'spell_shadow_shadowform.png',
    
    // ROGUE
    'rogue/assassination': 'ability_rogue_eviscerate.png',
    'rogue/combat': 'ability_backstab.png',
    'rogue/subtlety': 'ability_stealth.png',
    
    // SHAMAN
    'shaman/elemental': 'spell_nature_lightning.png',
    'shaman/enhancement': 'spell_nature_lightningshield.png',
    'shaman/restoration': 'spell_nature_magicimmunity.png',
    
    // WARLOCK
    'warlock/affliction': 'spell_shadow_curseofsargeras.png',
    'warlock/demonology': 'spell_shadow_summonimp.png',
    'warlock/destruction': 'spell_shadow_shadowbolt.png',
    
    // WARRIOR
    'warrior/arms': 'ability_warrior_savageblow.png',
    'warrior/fury': 'ability_warrior_innerrage.png',
    'warrior/protection': 'ability_warrior_defensivestance.png'
};

// Get all class directories
function getClassDirs() {
    try {
        return fs.readdirSync(targetDir, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);
    } catch (error) {
        console.error(`❌ Error reading target directory: ${targetDir}`);
        console.error(error.message);
        return [];
    }
}

function updateSpecIcons() {
    console.log('🎨 UPDATING SPEC ICONS IN PROJECT');
    console.log(`📁 Target directory: ${targetDir}`);
    console.log('Using icons from your existing assets/icons folder\n');
    console.log('='.repeat(60));

    const classDirs = getClassDirs();
    if (classDirs.length === 0) {
        console.log('❌ No class directories found!');
        return;
    }

    let updatedCount = 0;
    let skippedCount = 0;
    let notFoundCount = 0;
    let errorCount = 0;

    classDirs.forEach(className => {
        const classDir = path.join(targetDir, className);

        // Get all spec files (non-raw files)
        let specFiles;
        try {
            specFiles = fs.readdirSync(classDir)
                .filter(file => file.endsWith('.ts') && !file.startsWith('raw_'));
        } catch (error) {
            console.log(`❌ Error reading ${className} directory: ${error.message}`);
            errorCount++;
            return;
        }

        if (specFiles.length === 0) {
            return;
        }

        console.log(`\n${className.toUpperCase()}:`);

        specFiles.forEach(specFile => {
            const specName = specFile.replace('.ts', '');
            const specKey = `${className}/${specName}`;
            const specFilePath = path.join(classDir, specFile);

            // Check if we have an icon mapping for this spec
            const iconFileName = specIconMappings[specKey];
            if (!iconFileName) {
                console.log(`  ⚠️  ${specName}: No icon mapping defined`);
                notFoundCount++;
                return;
            }

            try {
                // Read and parse the existing TS file
                const tsContent = fs.readFileSync(specFilePath, 'utf8');
                const exportMatch = tsContent.match(/export const (\w+)(?:: \w+)? = ({[\s\S]*});/);
                if (!exportMatch) {
                    console.log(`  ❌ ${specName}: Could not parse file`);
                    errorCount++;
                    return;
                }

                const exportName = exportMatch[1];
                let tsSpec;
                try {
                    tsSpec = eval(`(${exportMatch[2]})`);
                } catch (error) {
                    console.log(`  ❌ ${specName}: Error parsing - ${error.message}`);
                    errorCount++;
                    return;
                }

                // Update the specIcon field
                const oldSpecIcon = tsSpec.specIcon;
                tsSpec.specIcon = iconFileName;

                // Check if original had type annotation
                const hasTypeAnnotation = tsContent.includes(`: Tree`);
                const typeAnnotation = hasTypeAnnotation ? ': Tree' : '';
                
                // Check if original had import statement
                const hasImport = tsContent.includes('import type { Tree }');
                const importStatement = hasImport ? 'import type { Tree } from "../../types";\n\n' : '';
                
                // Check if original uses unquoted keys (like the warrior files)
                const usesUnquotedKeys = tsContent.includes('name: ') && !tsContent.includes('"name":');
                
                // Generate the updated TypeScript content
                let updatedTsContent;
                if (usesUnquotedKeys) {
                    // Format with unquoted keys for warrior-style files
                    updatedTsContent = `${importStatement}export const ${exportName}${typeAnnotation} = ${JSON.stringify(tsSpec, null, 2).replace(/"([^"]+)":/g, '$1:')}`;  
                } else {
                    // Format with quoted keys for other files
                    updatedTsContent = `${importStatement}export const ${exportName}${typeAnnotation} = ${JSON.stringify(tsSpec, null, 4)};`;
                }

                // Write the updated file
                fs.writeFileSync(specFilePath, updatedTsContent);

                if (oldSpecIcon === iconFileName) {
                    console.log(`  ✅ ${specName}: Icon already correct (${iconFileName})`);
                    skippedCount++;
                } else {
                    console.log(`  🎨 ${specName}: Updated icon to ${iconFileName}`);
                    updatedCount++;
                }
            } catch (error) {
                console.log(`  ❌ ${specName}: File operation error - ${error.message}`);
                errorCount++;
            }
        });
    });

    console.log('\n' + '='.repeat(60));
    console.log('📊 UPDATE SUMMARY:');
    console.log(`🎨 Icons updated: ${updatedCount}`);
    console.log(`✅ Icons already correct: ${skippedCount}`);
    console.log(`⚠️  Icons not found: ${notFoundCount}`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log('='.repeat(60));
    
    if (notFoundCount > 0) {
        console.log('\n💡 TIP: Check the research file for icon suggestions:');
        console.log('   wow_classic_spec_icons_research.md');
    }

    if (updatedCount > 0) {
        console.log('\n🚀 SUCCESS: Spec icons updated in your project!');
    }
}

// Execute the update
updateSpecIcons();
